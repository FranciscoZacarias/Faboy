/** @format */

const Command = require("../../utils/Command");
const request = require("request");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Daily horoscope!";
		this.aliases = ["horoscope", "basic-bitch-query"];
		this.public = true;
	}

	async run(parsed_message) {
		const options = {
			method: "POST",
			url: "https://sameer-kumar-aztro-v1.p.rapidapi.com/",
			qs: { sign: parsed_message.clean_message, day: "today" },
			headers: {
				"x-rapidapi-key": process.env.HOROSCOPE_KEY,
				"x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
				useQueryString: true,
			},
		};

		let temp = this.client;
		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			body = JSON.parse(body);

			if (body["message"])
				return parsed_message.message.channel.send("Wrond sign");

			const embed = new temp.Discord.RichEmbed()
				.setTitle("Horoscope for: " + parsed_message.clean_message)
				.setThumbnail(
					"http://1.bp.blogspot.com/-DcT8C9fnxDg/UW5t3X-88UI/AAAAAAAAAAM/kbxG2YRxXXk/w1200-h630-p-k-no-nu/Sem+T%C3%ADtulo.png"
				)
				.setDescription("Author: Professor Chibanga")
				.setColor("FFFF00")
				.addField("Range: ", body["date_range"])
				.addField("Current Date: ", body["current_date"])
				.addField("Vision:", body["description"])
				.addField("Compatibility: ", body["compatibility"])
				.addField("Mood: ", body["mood"])
				.addField("Color: ", body["color"])
				.addField("Lucky Number: ", body["lucky_number"])
				.addField("Lucky Time: ", body["lucky_time"])
				.setFooter(`if u geniunly belive this ur as basic as beans`);

			return parsed_message.message.channel.send(embed);
		});
	}
};
