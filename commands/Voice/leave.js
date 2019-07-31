const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
    }

    async run(parsed_message)
    {
        let message = parsed_message.message; 
        if(message.guild.voiceConnection)
        {
            message.guild.voiceConnection.disconnect();
        }
        else
        {
            message.channel.send('what');
        }
    }
}