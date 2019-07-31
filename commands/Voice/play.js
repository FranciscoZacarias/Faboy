const Command = require('../../utils/Command');
const ytdl = require('ytdl-core');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
    }

    async run(parsed_message)
    {
        let message = parsed_message.message; 
        if(message.member.voiceChannel)
        {
            if(!message.guild.voiceConnection)
            {
                const streamOptions = {seek: 0, volume: 1};
                message.member.voiceChannel.join()
                .then(connection => 
                {
                    const stream = ytdl('https://www.youtube.com/watch?v=U06jlgpMtQs', {filter: 'audioonly' });
                    const dispatcher = connection.playStream(stream, streamOptions);
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
        else
        {
            message.channel.send('where');
        }
    }
}