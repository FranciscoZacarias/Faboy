const Command = require('../../utils/Command');

module.exports = class extends Command
{
    constructor(name, client, locale)
    {
        super(name, client, locale);
    }

    async run(parsed_message)
    {
        return this.client.fetch(
            `https://api.edamam.com/search?q=${parsed_message.clean_message}&app_id=${process.env.EDAMAM_ID}&app_key=${process.env.EDAMAM_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
        ).then((response) =>
        {
            response.json().then((data) =>
            {
                if(!data.hits[0]) return parsed_message.message.channel.send('Cant find that recipe');
                const recipe = data.hits[0].recipe;
                
                let ingredient_list = "";
                (recipe.ingredientLines).forEach(ingredient => 
                {
                    ingredient_list += ingredient + "\n";    
                });

                const embed = new this.client.Discord.RichEmbed()
                    .setTitle("RECIPE FOR: " + recipe.label)
                    .setDescription(recipe.healthLabels)
                    .setURL(recipe.url)
                    .setColor('00FF00')
                    .setThumbnail(recipe.image)
                    .addField("Calories: ", Math.round(recipe.calories * 100) / 100)
                    .addField("Prep Time: ", recipe.totalTime + "min." )
                    .addField("Ingredients List:", ingredient_list)
                    .setFooter(`Author: ` + recipe.source);

                return parsed_message.message.channel.send(embed);
            });
        });
    }
}