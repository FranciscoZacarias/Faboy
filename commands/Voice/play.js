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
        if(message.member.voiceChannel && !message.guild.voiceConnection)
        {
            message.member.voiceChannel.join()
            .then(connection => 
            {
                console.log(parsed_message.clean_message);
                const stream = ytdl('https://www.youtube.com/watch?v=3M_5oYU-IsU', {filter: 'audioonly' });
                const dispatcher = connection.playStream(stream, { seek: 0, volume: 1 });
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