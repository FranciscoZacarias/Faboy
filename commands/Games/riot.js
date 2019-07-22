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
        return (parsed_message.args.includes('-champ')) ? this.get_champion(parsed_message) : this.get_match(parsed_message);
    }

    async get_champion(parsed_message)
    {
        let champ = "";
        champions.forEach(champion => 
        {
            if(champion.id == parsed_message.clean_message)
            {
                champ = champion;
            }
        });
        if(!champ)
        {
            return parsed_message.message.channel.send('Cannot find that champion!');
        }
        const embed = new this.client.Discord.RichEmbed()
            .setTitle("Champion: " + `**__${(champ.id).toUpperCase()}__**`)
            .setDescription(champ.title)
            .setThumbnail(champ.icon)
            .addField('Roles', champ.tags)
            .setColor('#FF0000')
        return parsed_message.message.channel.send(embed);
    }

    async get_match(parsed_message)
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
        let teams = ["",""]; //two teams
        let index = 0;
        let half_players = 4;
        
        if(current_match.mapId == 10) //if map is twisted treeline
            half_players = 2;
        
        for(let i = 0; i < players.length; i++)
        {
            const player = players[i];
            const player_league = await (this.get_data(`${url}/lol/league/v4/entries/by-summoner/${player.summonerId}/${api_key}`));
            
            let this_league = {}; //dict with ranks and lp
            for(let i = 0; i < player_league.length; i++)
            {
                this_league[player_league[i].queueType] = `${player_league[i].tier} ${player_league[i].rank}`;
                this_league['LP'] = `${player_league[i].leaguePoints} (W:${player_league[i].wins} L:${player_league[i].losses})`;
            }

            let this_champ = "";
            for(let i = 0; i < champions.length; i++)
            {
                if(player.championId == champions[i].key)
                {
                    this_champ = (champions[i].id).toUpperCase();
                }
            }

            if(i > half_players) index = 1; //split player in 2 teams in discord embed
            let rank = "";
            if(!player_league[0])
            {
                rank = `UNRANKED\n`;
            }
            else
            {
                let current_rank = (this_league['RANKED_SOLO_5x5']) ? `Rank(SoloQ) ${this_league['RANKED_SOLO_5x5']}` : `Rank(${Object.keys(this_league)[0]}) ${Object.values(this_league)[0]}`;
                rank = `${current_rank}\n--LP: ${this_league['LP']}\n`;
            }   
            teams[index] += await `**__${this_champ}__** - ${player.summonerName}\n--${rank}`;
        }
        const embed = new this.client.Discord.RichEmbed()
            .setTitle("LEAGUE OF LEGENDS:")
            .addField("#####TEAM 1#####", teams[0])
            .addField("#####TEAM 2#####", teams[1])
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