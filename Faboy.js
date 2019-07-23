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
        this.Discord = require('discord.js');
        this.fetch = require('node-fetch');
        this.moment = require('moment');
        this.database = require('./database.js');
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
}