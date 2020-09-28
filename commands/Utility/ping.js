const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.description = "Pong!";
    }

    async run(parsed_message)
    {
        return parsed_message.message.channel.send('pong!');
    }
}