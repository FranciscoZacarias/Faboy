const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.aliases = ["motivation", "motivational", "phrase", "deep", "inspire", "inspirational", "quote"];
    }

    async run(parsed_message)
    {
        let data = new URLSearchParams();
        const url = "https://inspirobot.me/api?generate=true";

        data.append('request', url);
        this.client.fetch(url, { method: 'GET' })
        .then((res => res.text()))
        .then(response =>
        {
            return parsed_message.message.channel.send(response);
        });
    }
}