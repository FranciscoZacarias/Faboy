const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.description = "Meme man speaks";
        this.aliases = ['stonk', 'mememan'];
    }

    async run(parsed_message)
    {
        this.client.runImageDraw(parsed_message, 'stonks', 3, 0.7);
    }
}
