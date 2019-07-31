const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
    }

    async run(parsed_message)
    {
        const react_array = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇲","🇳","🇴","🇵","🇶","🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾","🇿"];
        const options = parsed_message.clean_message.split(',');
        
        let pool_embed = new this.client.Discord.RichEmbed()
        .setTitle("Vote:")
        .setColor("ffff00")

        options.forEach((option,index) => 
        {
            if(index <= react_array.length)
            {
                option.trim();
                if(!option) return;
                let str = `${react_array[index]} - ${options[index]}`;
                pool_embed.addField('------', str);
            }
        });

        parsed_message.message.channel.send(pool_embed).then(
            async msg_sent => 
            {
                for(let i = 0; i < options.length; i++)
                {
                    if(!options[i]) continue;
                    await msg_sent.react(react_array[i]);
                }
            }
        );
    }

}