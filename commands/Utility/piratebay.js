const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
    }

    async run(parsed_message)
    {
        const { spawn } = require('child_process');
        const script = spawn('python',['./scripts/piratebay.py', parsed_message.clean_message]);
        
        const chunks = [];

        script.stdout.on('data', (data) => 
        {
            chunks.push(data)
        });
        script.stdout.on('end', () => 
        {
            let output_buf = Buffer.concat(chunks)
            let obj;
            try
            {
                obj = (JSON.parse(output_buf.toString()))[0];
            }
            catch(err) 
            {
                return parsed_message.message.channel.send("Can't find that torrent");
            }

            const desc_string = `Category: ${obj.Category} | Plataform: ${obj.Plataform} \nSeeders: ${obj.Seeders} | Leechers: ${obj.Leechers} \nSize: ${obj.Size} | Author Title: ${obj.Title}`
            const embed = new this.client.Discord.RichEmbed()
                .setTitle("RESULTS FOR: " + parsed_message.clean_message)
                .setDescription("REMEMBER: If you LIKE it, BUY it.")
                .setURL(obj.URL)
                .setColor('#FF0000')
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/The_Pirate_Bay_logo.svg/2000px-The_Pirate_Bay_logo.svg.png')
                .addField(`${obj.Name}`, desc_string)
                .setFooter(`${obj.By} | ${obj.Uploaded}`);
                (parsed_message.args.includes('-m')) ? (embed.addField(`Magnet: `,`${obj.Magnet}`)) : ""   
            
            return parsed_message.message.channel.send(embed);
        });
        script.stderr.on('data', (err) =>
        {
            this.client.logger.log(err, 'error');
        });
    }
}