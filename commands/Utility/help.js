const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.aliases = ['?', 'commands', '911']
    }

    async run(parsed_message)
    {
        let command_str = "";
        this.client.commands.forEach(cmd => 
        {
            command_str += cmd.name + '\n';
        });
        const embed = new this.client.Discord.RichEmbed()
            .setTitle('Helper')
            .setDescription('faboy <command> <arguments>')
            .setColor('#0000FF')
            .addField('Commands', command_str)
        return parsed_message.message.channel.send(embed);
    }
}