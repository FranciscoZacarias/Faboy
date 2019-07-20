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
        if(current_match.status)
        {
            return parsed_message.message.channel.send('Summoner not found or not in match');
        }
        console.log(current_match)
        const players = current_match.participants

        let field1 = "";
        let field2 = "";
        for(let i = 0; i < players.length; i++)
        {
            const player = players[i];
            const player_league = await (this.get_data(`${url}/lol/league/v4/entries/by-summoner/${player.summonerId}/${api_key}`));
            if(i < 5)
            {
                if(!player_league[0]) 
                    field1 += await `Summoner Name: ${player.summonerName}\n--Rank: Unranked\n`;
                else
                    field1 += await `Summoner Name: ${player.summonerName}\n--Rank: ${player_league[0].tier} ${player_league[0].rank}\n--LP:${player_league[0].leaguePoints} (W:${player_league[0].wins} L:${player_league[0].losses})\n`;
            }
            else
            {
                if(!player_league[0])
                    field2 += await `Summoner Name: ${player.summonerName}\n--Rank: Unranked\n`;
                else
                    field2 += await `Summoner Name: ${player.summonerName}\n--Rank: ${player_league[0].tier} ${player_league[0].rank}\n--LP:${player_league[0].leaguePoints} (W:${player_league[0].wins} L:${player_league[0].losses})\n`;
            }
        }
        const embed = new this.client.Discord.RichEmbed()
            .setTitle("LEAGUE OF LEGENDS:")
            .addField("TEAM 1", field1)
            .addField("TEAM 2", field2)
            .setColor("#ffffcc")
            .setThumbnail('https://nse.gg/media/1990/lol_client_logo.png?anchor=center&mode=crop&width=300&height=300')

        return parsed_message.message.channel.send(embed);
    }

    async get_data(uri)
    {
        const response = await this.client.fetch(uri);
        const data = await response.json();
        return data;
    }
}