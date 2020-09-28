const fs = require('fs');
const moment = require("moment");

module.exports = class Logger
{
    static log(content, type = 'log')
    {
        const logtext = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]: ${type.toUpperCase()} ${content}`;
        
        if(type == 'error')
        { 
            postErrortoWebhook("ERROR: " + content);
        }

        fs.appendFile(`./logs/${type}.log`, content + '\n', function(err){});
        
        return console.log(logtext);
    }
}

function postErrortoWebhook(content) 
{
    const Discord = require('discord.js');
    const webhook = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);
    webhook.send(content);
}