const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.description = "Kinda sus ngl";
        this.aliases = ['amongus', 'impostor', 'suspect']
    }

    async run(parsed_message)
    {
        const chars = ["<:aublack:760132021556740146>", "<:aublue:760132021560279067>", "<:aubrown:760132021648359434>", "<:aucyan:760132021560934440>",
        "<:augreen:760132021396701205>", "<:aulime:760132021577056296>", "<:auorange:760132021585444904>", "<:aupink:760132021321334795>", "<:aupurple:760132021698953216>",
        "<:aured:760132021614805042>", "<:auwhite:760133850297925653>", "<:auyellow:760132021631844362>"];  

        return parsed_message.message.channel.send(chars[Math.floor(Math.random() * chars.length)]);
    }
}