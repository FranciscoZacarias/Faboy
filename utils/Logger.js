/** @format */

const fs = require("fs");
const moment = require("moment");

module.exports = class Logger {
	static log(content, type = "log") {
		const logtext = `[${moment().format(
			"YYYY-MM-DD HH:mm:ss"
		)}]: ${type.toUpperCase()} ${content}`;
		logToWebhook(logtext);
		fs.appendFile(`./logs/${type}.log`, logtext + "\n", function (err) {});

		return console.log(logtext);
	}
};

function logToWebhook(content) {
	const Discord = require("discord.js");
	const webhook = new Discord.WebhookClient(
		process.env.WEBHOOK_ID,
		process.env.WEBHOOK_TOKEN
	);
	webhook.send(content);
}
