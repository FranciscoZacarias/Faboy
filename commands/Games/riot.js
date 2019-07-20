const Command = require('../../utils/Command');
const champions = require('lol-champions');

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
        const players = current_match.participants
        let field = ["",""];
        let index = 0;
        for(let i = 0; i < players.length; i++)
        {
            const player = players[i];
            const player_league = await (this.get_data(`${url}/lol/league/v4/entries/by-summoner/${player.summonerId}/${api_key}`));
            console.log(player_league)
            let this_champ = "";
            let rank = "";
            champions.forEach(champion => 
            {
                if(player.championId == champion.key)
                {
                    this_champ = (champion.id).toUpperCase();
                }
            });
            if(i > 4) index = 1;
            if(!player_league[0])
                rank = `UNRANKED\n`;
            else
                rank = `${player_league[player_league.length-1].tier} ${player_league[player_league.length-1].rank}\n--LP: ${player_league[player_league.length-1].leaguePoints} (W:${player_league[player_league.length-1].wins} L:${player_league[player_league.length-1].losses})\n`;
            field[index] += await `**__${this_champ}__** - ${player.summonerName}\n--Rank: ${rank}`;
        }
        const embed = new this.client.Discord.RichEmbed()
            .setTitle("LEAGUE OF LEGENDS:")
            .addField("#####TEAM 1#####", field[0])
            .addField("#####TEAM 2#####", field[1])
            .setColor("#00BFFF")
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