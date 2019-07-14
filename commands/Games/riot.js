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
        const summoner = await fetch_api(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${parsed_message.clean_message}/${api_key}`, this.client)
        console.log(summoner)
        /*
        const summoner = await this.client.fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${parsed_message.clean_message}/${api_key}`)
        .then(async (response) =>
        {
            return response.json();
        });
        const matches = await this.client.fetch(`https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summoner.accountId}/${api_key}`)
        .then(async (response) =>
        {
            return response.json();
        });
        const last_match = await this.client.fetch(`https://euw1.api.riotgames.com/lol/match/v4/matches/${matches.matches[0].gameId}/${api_key}`)
        .then(async (response) => 
        {
            return response.json();
        });
        console.log(last_match)
        */
    }
}

function fetch_api(uri, context)
{
    context.fetch(uri)
    .then(async (response) =>
    {
        return response.json();
    })
}