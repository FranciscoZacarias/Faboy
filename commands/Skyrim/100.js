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
        const url = `https://api.imgflip.com/caption_image?template_id=167991076&username=fzac&password=${process.env.IMGFLIP_PW}&text0=${parsed_message.clean_message}`;
        return this.client.fetch(url,{
            method: 'POST'
        })
        .then((response) =>
        {
            response.json()
            .then((data) =>
            {
                //console.log(data);
                if(data.success != true) return;
                parsed_message.message.channel.send(data.data.url);
            });
        });
    }
}