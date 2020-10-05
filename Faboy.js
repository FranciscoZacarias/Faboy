/** @format */

const { Client, Collection } = require("discord.js");
const { readdirSync, statSync, readFile } = require("fs");
var Twitter = require("twitter");

module.exports = class Faboy extends Client {
	constructor(options = {}) {
		super(options);
		this.fs = require("fs");
		this.logger = require("./utils/Logger");
		this.chalk = require("chalk");
		this.commands = new Collection();
		this.acceptCommands = true;
		this.Discord = require("discord.js");
		this.fetch = require("node-fetch");
		this.moment = require("moment");
		this.ffmpeg = require("ffmpeg");
		this.jimp = require("jimp");
		this.regionsLang = {
			Portugal: "pt-PT",
			"United States": "en-EN",
		};
		this.twitterClient = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: process.env.TWITTER_ACCESS_TOKEN,
			access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
		});
		this.initializeEvents("./events");
		this.initializeCommands("./commands");
	}

	initializeCommands(path) {
		readdirSync(path).forEach((file) => {
			try {
				const file_path = path + "/" + file;
				if (file.endsWith(".js")) {
					const Command = require(file_path);
					const command_name = file.replace(/.js/g, "").toLowerCase();
					const command = new Command(command_name, this, file_path);
					this.commands.set(command_name, command, file_path);
				} else if (statSync(file_path).isDirectory()) {
					this.initializeCommands(file_path);
				}
			} catch (error) {
				this.logger.log(error, "error");
			}
		});
	}

	initializeEvents(path) {
		readdirSync(path).forEach((file) => {
			try {
				let file_path = path + "/" + file;
				if (file.endsWith("js")) {
					let Listener = require(file_path);
					this.on(file.replace(/.js/g, ""), Listener);
				} else if (statSync(file_path).isDirectory()) {
					this.initializeEvents(file_path);
				}
			} catch (error) {
				this.logger.log(error, "error");
			}
		});
	}

	/**
	 * Spawns the script at /scripts/imageDraw.py
	 * @param {dictinoary} parsed_message dictonary with filtered messaage content
	 * @param {string} image image name (must be .png)
	 * @param {int} textSizeBias bias for text size
	 * @param {float} heightBias bias for text height (1 default)
	 * @param {float} widthBias bias for text width (1 default)
	 */
	async runImageDraw(
		parsed_message,
		image,
		textSizeBias,
		heightBias = 0.0,
		widthBias = 0.0
	) {
		if (parsed_message.clean_message.length > 16)
			return parsed_message.message.channel.send("text too long boi");

		const { spawn } = require("child_process");
		const script = spawn("python", [
			"./scripts/imageDraw.py",
			parsed_message.clean_message,
			image,
			textSizeBias,
			heightBias,
			widthBias,
		]);
		const chunks = [];

		script.stdout.on("data", (data) => {
			chunks.push(data);
		});
		script.stdout.on("end", () => {
			let output_buf = Buffer.concat(chunks);
			let base64_str = JSON.parse(output_buf.toString()).picture;

			let data = new URLSearchParams();
			data.append("request", base64_str);
			this.fetch("https://www.base64decode.net/base64-image-decoder", {
				method: "POST",
				body: data,
			})
				.then((res) => res.text())
				.then((text) => {
					let html = JSON.stringify(text);
					let tag = "<img src=\\";
					let first_char = html.indexOf(tag) + tag.length + 1;
					let uri = "";
					let req = false;
					while (!req) {
						if (html[first_char] == "\\") {
							req = true;
							break;
						}
						uri += html[first_char++];
					}
					return parsed_message.message.channel.send(uri);
				});
		});
		script.stderr.on("data", (err) => {
			this.logger.log(err, "error");
		});
	}
};
