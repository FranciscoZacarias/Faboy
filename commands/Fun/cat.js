const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.description = "Cat gifs";
        this.aliases = ['pussy', 'kitty', 'cats'];
    }

    async run(parsed_message)
    {
        return this.client.fetch(
            `https://api.thecatapi.com/v1/images/search?mime_types=gif,jpg,png?x-api-key=${process.env.CAT_API_KEY}`
        ).then((response) => 
        {
            if(response.status !== 200) callback(response.status, null);
            response.json()
            .then((data) =>
            {
                const cat_embed = new this.client.Discord.RichEmbed()
                .setTitle("Cat")
                .setColor("#ff60b4")
                .setImage(data[0].url);
    
                return parsed_message.message.channel.send(cat_embed);   
            });
        })
        .catch((err) => 
        {
            this.logger.log(error, 'error');
        });
    }

}