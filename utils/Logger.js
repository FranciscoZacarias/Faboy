const chalk = require('chalk');
const moment = require("moment");

module.exports = class Logger
{
    static log(content, type = 'log')
    {
        const logtext = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]: ${type.toUpperCase()} ${content}`;
        return console.log(logtext);
    }
}


