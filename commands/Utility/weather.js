/** @format */

const Command = require("../../utils/Command");
const weather = require("weather-js");

module.exports = class extends Command {
	constructor(name, client, locale) {
		super(name, client, locale);
		this.description = "Weather in given place";
	}

	async run(parsed_message) {
		weather.find(
			{ search: parsed_message.clean_message, degreeType: "C" },
			(err, result) => {
				if (err) return console.log(err);
				else if (!result[0])
					return parsed_message.message.channel.send("Can't find that place");

				const current = result[0].current;
				const location = result[0].location;

				let weather_embed = new this.client.Discord.RichEmbed()
					.setDescription(`**${current.skytext}**`)
					.setAuthor(`Weather for ${current.observationpoint}`)
					.setThumbnail(current.imageUrl)
					.addField("Time Zone", `UTC${location.timezone}`, true)
					.addField("Degree Type", location.degreetype, true)
					.addField("Temperature", `${current.temperature} Degrees`, true)
					.setColor(this.setcolor(current.temperature))
					.addField("Feels Like", `${current.feelslike} Degrees`, true)
					.addField("Winds", current.winddisplay, true)
					.addField("Humidity", `${current.humidity}%`, true);
				return parsed_message.message.channel.send(weather_embed);
			}
		);
	}

	setcolor(temp) {
		if (temp <= 0) return "#0066ff";
		else if (0 < temp && temp <= 5) return "#3399ff";
		else if (5 < temp && temp <= 10) return "#66ccff";
		else if (10 < temp && temp <= 20) return "#ccffff";
		else if (20 < temp && temp <= 25) return "#ffffcc";
		else if (25 < temp && temp <= 30) return "#ffff66";
		else if (30 < temp && temp <= 35) return "#ffcc66";
		else if (35 < temp && temp <= 40) return "#ffffcc";
		else if (40 < temp && temp <= 45) return "#ff9933";
		else if (45 < temp && temp <= 50) return "#ff3300";
		else return "#ff0000";
	}
};
