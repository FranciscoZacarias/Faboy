/** @format */

const { Client, Collection } = require("discord.js");
const { readdirSync, statSync, readFile } = require("fs");
var Twitter = require("twitter");

module.exports = class Faboy extends Client {
	constructor(options = {}) {
		super(options);
		this.fs = require("fs");
		this.cron = require("node-cron");
		this.logger = require("./utils/Logger");
		this.chalk = require("chalk");
		this.commands = new Collection();
		this.modules = new Collection();
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
		this.initializeModules("./utils/modules");
		this.initializeJobs("./jobs");
	}

	/**
	 * Initializes all commands
	 * @param {string} path path to commands folder
	 */
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

	/**
	 * Initializes all Discord events
	 * @param {string} path path to discord events folder
	 */
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
	 * Initializes all modules
	 * @param {string} path path do modules
	 */
	initializeModules(path) {
		readdirSync(path).forEach((file) => {
			try {
				let file_path = path + "/" + file;
				if (file.endsWith("js")) {
					let Listener = require(file_path);
					this.modules.set(file.replace(/.js/g, ""), Listener);
				} else if (statSync(file_path).isDirectory()) {
					this.initializeEvents(file_path);
				}
			} catch (error) {
				this.logger.log(error, "error");
			}
		});
	}

	/**
	 * Initializes all job schedules
	 * @param {string} path path to folder with jobs to schedule
	 */
	initializeJobs(path) {
		readdirSync(path).forEach((file) => {
			try {
				let file_path = path + "/" + file;
				if (file.endsWith("js")) {
					const Job = require(file_path);
					const job_name = file.replace(/.js/g, "").toLowerCase();
					const job_instance = new Job(job_name, this);
					job_instance.run();
				} else if (statSync(file_path).isDirectory()) {
					this.initializeJobs(file_path);
				}
			} catch (error) {
				this.logger.log(error, "error");
			}
		});
	}

	getModule(moduleName) {
		return this.modules.find((m) => m.name === moduleName);
	}
};
