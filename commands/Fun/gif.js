const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
    }

    async run(parsed_message)
    {
        const url = `https://api.tenor.com/v1/search?tag="${parsed_message.clean_message}&key=${process.env.TENOR_API_KEY}`
        return this.client.fetch(url)
        .then((response) => 
        {
            if(response.status != 200)
            {
                this.logger.log(response.status, 'error');
            }
            response.json()
            .then((data) =>
            {
                let response;
                if(data.results[ Math.floor(Math.random()* data.results.length ) ].url)
                {
                    response = data.results[0].url;
                } 
                else
                {
                    resposne = "Gif Not Found!";
                }
                return parsed_message.message.channel.send(response);
            })
        });
    }

}