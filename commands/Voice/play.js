const Command = require('../../utils/Command');
const ytdl = require('ytdl-core');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.aliases = ['join', 'youtube']
    }

    async run(parsed_message)
    {
        let message = parsed_message.message; 
        let link = parsed_message.clean_message;
        if(message.member.voiceChannel && !message.guild.voiceConnection)
        {
            message.member.voiceChannel.join()
            .then(connection => 
            {
                const stream = ytdl(message.content.split(" ")[2], {filter: 'audioonly' });
                const dispatcher = connection.playStream(stream, { seek: 0, volume: 1 });
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
            message.channel.send('u dumb'); 
        }
    }
}