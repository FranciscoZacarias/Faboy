const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.aliases = ['choose']
    }

    async run(parsed_message)
    {
        let arr = parsed_message.clean_message.split(',');
        return parsed_message.message.channel.send(arr[Math.floor(Math.random() * (arr.length))]); 
    }
}