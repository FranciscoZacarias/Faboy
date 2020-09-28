module.exports = class Command
{
    constructor(name, client, locale)
    {
        this.name = name;
        this.client = client;
        this.locale = locale;
        this.description = "Command";
        this.aliases = [];
    }

    process(parsed_message)
    {
        return this.run(parsed_message);
    }

    run() {};
}
