const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.aliases = ['src', 'code', 'git', 'github', 'js', 'rep', 'repo', 'repository']
    }

    async run(parsed_message)
    {
        return parsed_message.message.channel.send('https://github.com/FranciscoZacarias/Faboy');
    }
}