const { Client, Collection } = require('discord.js');
const { readdirSync, statSync, readFile } = require('fs');

module.exports = class Faboy extends Client 
{
    constructor(options = {})
    {
        super (options)
        this.fs = require('fs');
        this.logger = require('./utils/Logger');
        this.chalk = require('chalk');
        this.commands = new Collection();
        this.acceptCommands = true;
        this.Discord = require('discord.js');
        this.fetch = require('node-fetch');
        this.moment = require('moment');
        this.ffmpeg = require('ffmpeg');
        this.jimp = require('jimp');
        this.regionsLang = {
            'Portugal': 'pt-PT',
            'United States': 'en-EN'
        };
        this.initializeEvents('./events');
        this.initializeCommands('./commands');
    }

    initializeCommands(path)
    {
        readdirSync(path).forEach(file => 
        {
            try
            {
                const file_path = path + '/' + file;
                if(file.endsWith('.js'))
                {
                    const Command = require(file_path);
                    const command_name = file.replace(/.js/g, '').toLowerCase();
                    const command = new Command(command_name, this, file_path);
                    this.commands.set(command_name, command, file_path);
                }
                else if(statSync(file_path).isDirectory())
                {
                    this.initializeCommands(file_path);
                }
            }
            catch(error)
            {
                this.logger.log(error, 'error');
            }
        });
    }

    initializeEvents(path)
    {
        readdirSync(path).forEach(file =>
        {
            try
            {
                let file_path = path + '/' + file;
                if(file.endsWith('js'))
                {
                    let Listener = require(file_path);
                    this.on(file.replace(/.js/g, ''), Listener);
                }
                else if(statSync(file_path).isDirectory())
                {
                    this.initializeEvents(file_path);
                }
            } 
            catch(error)
            {
                this.logger.log(error, 'error');
            }
        });
    }

    /**
     * Meant for any command that runs /scripts/imageDraw.py
     * @param {dictinoary} parsed_message dictonary with filtered messaage content
     * @param {string} image image name (must be .png)
     * @param {int} textSizeBias bias for text size
     * @param {float} heightBias bias for text height
     */
    async runImageDraw(parsed_message, image, textSizeBias, heightBias)
    {
        const { spawn } = require('child_process');
	
        const script = spawn('python',['./scripts/imageDraw.py', parsed_message.clean_message, image, textSizeBias, heightBias]);
        
        const chunks = [];

        script.stdout.on('data', (data) => { 
		chunks.push(data)
        });
        script.stdout.on('end', () => 
	    {
            let output_buf = Buffer.concat(chunks)
            let base64_str = (JSON.parse(output_buf.toString())).picture;
            
            let data = new URLSearchParams();
            data.append('request', base64_str)
            this.fetch('https://www.base64decode.net/base64-image-decoder',{
                method: 'POST',
                body: data
            })
            .then((res => res.text()))
            .then(text =>
            {
                let html = JSON.stringify(text)
                let tag = '<img src=\\';
                let first_char = html.indexOf(tag) + tag.length + 1;
                let uri = '';
                let req = false;
                while(!req)
                {
                    if(html[first_char] == '\\')
                    {
                        req = true;
                        break;
                    }
                    uri += html[first_char++];
                }
                return parsed_message.message.channel.send(uri);
            });
        });
        script.stderr.on('data', (err) =>
        {
            this.client.logger.log(err, 'error');
        });
    } 
}
