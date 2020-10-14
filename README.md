# Faboy

Faboy is a fully modular discord bot made for fun and learning, hosted on a raspbery pi 4.

# Commands

To add commands, create a `.js` file in the [commands](commands) folder and export a class that extends [Command](utils/Command.js) and implement the run method. See [command.example](commands/command.example) for a sample command class.

# Events

To add events, create a `.js` file in the [events](events) folder and make sure the name of the file represents an actual [Discord.js Client Event](https://discord.js.org/#/docs/main/stable/class/Client). In that file, export a function that will run when that event triggers.

# Jobs

To schedule jobs, I am using [Node-Cron](https://www.npmjs.com/package/node-cron).

Jobs are functions that will run every X units of time (Seconds, Minutes, Hours...). Create a `.js` file that exports a class that extends [Job](utils/Job.js). Override the schedule property and the job function. See [job.example](jobs/job.example) for a sample function.

# Environment Variables

See [.env.example](.env.example) and create your own `.env` file.
