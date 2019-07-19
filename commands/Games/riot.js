const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
        this.aliases = ['lol', 'league', 'leagueoflegends', 'league-of-legends']
    }

    async run(parsed_message)
    {
        const api_key = '?api_key=' + process.env.RIOT_API_KEY;
        const region = (parsed_message.args.length != 0) ? parsed_message.args[0].substring(1) : 'euw1';
        const url = `https://${region}.api.riotgames.com`;

        const summoner = await this.get_data(`${url}/lol/summoner/v4/summoners/by-name/${parsed_message.clean_message}/${api_key}`)
        const current_match  = await this.get_data(`${url}/lol/spectator/v4/active-games/by-summoner/${summoner.id}/${api_key}`)
        console.log(current_match)

    }

    async get_data(uri)
    {
        const response = await this.client.fetch(uri);
        const data = await response.json();
        return data;
    }
}