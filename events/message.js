module.exports = async function(message)
{
    const msg = message_parser(message);
    if(msg.perfix != process.env.BOT_PERFIX) return;
    
    try
    {
        const command_run = this.commands.find(c => c.name === msg.command || c.aliases.includes(msg.command));
        if(!command_run) return;
        command_run.process(msg);
    }
    catch(error)
    {
        console.log(error);
    }
}

/**
 * DICT KEYS
 * 
 * content
 * perfix
 * command
 * args
 * clean_message
 * discord_alias
 * discord_id
 * discord_isBot
 * guild_name
 * guild_id
 * message
 */

function message_parser(message)
{
    let parsed_message = {};
    parsed_message['content'] = message.content; 

    let args = message.content.toLowerCase().split(" ");
    parsed_message['perfix'] = args.shift();
    parsed_message['command'] = args.shift() || '';

    let clean_message = [];
    for(let i = 0; i < args.length; i++)
    {
        if(args[i][0] != '-')
            clean_message.push(args.splice(i--, 1));
    }

    parsed_message['args'] = args;
    parsed_message['clean_message'] = clean_message.join(' ');
    parsed_message['discord_alias'] = message.author.username;
    parsed_message['discord_id'] = message.author.id;
    parsed_message['discord_isBot'] = message.author.bot;
    parsed_message['guild_name'] = message.guild.name;
    parsed_message['guild_id'] = message.guild.id;
    parsed_message['message'] = message;
    
    return parsed_message;
}
