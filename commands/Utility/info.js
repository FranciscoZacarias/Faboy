/** @format */

const Command = require("../../utils/Command");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Bot Information";
		this.aliases = [
			"src",
			"code",
			"git",
			"github",
			"js",
			"status",
			"source",
			"repository",
		];
	}

	async run(parsed_message) {
		const embed = new this.client.Discord.RichEmbed()
			.setTitle("Faboy Information")
			.setDescription("Discord bot created by <@191198198344318977>")
			.setColor("#0000FF")
			.setThumbnail(
				"https://cdn.discordapp.com/attachments/488742165510488106/761322990499135558/faboy22.jpeg"
			)
			.addField(
				"Who is Faboy?",
				"Faboy is a concept inspired by real life events. \
				Much like a real human, Faboy doesn't do very much. His ruthlessness allowed him to thrive in this unforgiving world so far."
			)
			.addField("Zodiac Sign: ", "Lion. What else is there to say? :)")
			.addField(
				"Most useful commands:",
				"-slot-machine: Faboy is very open about his gambling addiction. Despite this, he still openly promotes it as a trust building exercise with god.\
				\n-stonks: Faboy enjoyes the occasional meme\
				\n-Pick: Faboy's strong will allows him to make the hardest choices\
				\n-tweet: You can literaly tweet something on my behalf. Your power is limitless"
			)
			.addField(
				"Hobbies:",
				"-Mining the bitcoin\n-Eating mcdonalds from non requested uber deliveries at 2am. Always overtips the driver\n-Delivering the machine"
			)
			.addField("Get Started:", "Try 'faboy help'!")
			.addField("Follow me on Twitter!", "https://twitter.com/faboy14438099")
			.addField("Source code: ", "https://github.com/FranciscoZacarias/Faboy")
			.setTimestamp()
			.setFooter(
				"Powered by Prozis",
				"https://upload.wikimedia.org/wikipedia/en/7/72/Prozis_new_branding.png"
			);

		return parsed_message.message.channel.send(embed);
	}
};
