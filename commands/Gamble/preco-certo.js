const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.alias = ["preçocerto", "precocerto", "preco", "pc", "priceisright", "pir", "priceright"];
    }

    async run(parsed_message)
    {
        
    }
}