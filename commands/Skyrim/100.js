const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.aliases = ['skill']
    }

    async run(parsed_message)
    {
        const { spawn } = require('child_process');
        const script = spawn('python',['./scripts/100.py', parsed_message.clean_message]);
        
        const chunks = [];

        script.stdout.on('data', (data) => 
        {
            chunks.push(data)
        });
        script.stdout.on('end', () => 
        {
            let output_buf = Buffer.concat(chunks)
            let base64_str = (JSON.parse(output_buf.toString())).picture;
            
            let data = new URLSearchParams();
            data.append('request', base64_str)
            this.client.fetch('https://www.base64decode.net/base64-image-decoder',{
                method: 'POST',
                body: data
            })
            .then((res => res.text()))
            .then(text =>
            {
                let html = JSON.stringify(text)
                let first_char = html.indexOf('<img src=\\') + 11;
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
        /*
        const uri = `https://api.imgflip.com/caption_image?template_id=167991076&username=fzac&password=${process.env.IMGFLIP_PW}&text0=${parsed_message.clean_message}&max_font_size=60&outline_color=#000000`;
        return this.client.fetch(uri,{
            method: 'POST',
            header: {
            },
            body: {
            }
        })
        .then((response) =>
        {
            response.json()
            .then((data) =>
            {
                console.log(data);
                if(data.success != true) return;
                parsed_message.message.channel.send(data.data.url);
            });
        });
        */
    }
}