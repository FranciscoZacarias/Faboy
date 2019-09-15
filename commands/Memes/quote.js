const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.aliases = ["motivation", "motivational", "phrase", "deep", "inspire", "inspirational", "inspiration"];
    }

    async run(parsed_message)
    {
        const url = "https://inspirobot.me/api?generate=true";

        this.client.fetch(url, { method: 'GET' })
        .then(res => res.text())
        .then(response =>
        {
            return parsed_message.message.channel.send(response);
        });
    }
}