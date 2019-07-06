const activities = require('../activity.json');

module.exports = function () 
{
    this.logger.log(`Logged in as ${this.user.tag}`, 'ready');

    const random_act = randomize_activity(activities);
    this.user.setActivity(random_act.value, { type: random_act.key });
}

function randomize_activity(these_activities)
{
    activity_list = Object.keys(these_activities);
    key_position = Math.floor((Math.random() * Object.keys(these_activities).length) + 0);
    key = activity_list[key_position];
    value_position = Math.floor((Math.random() * Object.keys(these_activities[activity_list[key_position]]).length) + 0);
    value = these_activities[key][value_position];

    return { 'key': key, 'value': value };
}