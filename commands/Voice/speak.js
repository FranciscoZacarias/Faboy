const Command = require('../../utils/Command');
const ytdl = require('ytdl-core');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.aliases = ['fala', 'diz', 'scream'];
    }

    async run(parsed_message)
    {

        let message = parsed_message.message; 
        if(message.member.voiceChannel && !message.guild.voiceConnection)
        {
            let audio = (parsed_message.clean_message) ? parsed_message.clean_message : 'scream';
            message.member.voiceChannel.join()
            .then(connection => 
            {
                const dispatcher = connection.playFile(`./assets/audio/${audio}.mp3`, { seek: 0, volume: 1 });
                dispatcher.on('end', () =>
                {
                    message.guild.voiceConnection.disconnect();
                });
            })
            .catch(err =>
            {
                this.client.logger.log(err, 'error');
            })
        }
        else
        {
            message.channel.send('ONE AT A TIME'); 
        }
    }
}