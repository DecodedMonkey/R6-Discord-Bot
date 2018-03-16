const prefix = process.env.BOT_PREFIX;
const Discord = require('discord.js');
const strats = require('../strats.json');

module.exports.run = async (bot, msg, cmd, args) => {
    const filterObject = (object, property, string1, string2) => {
        let filteredObj = object.filter((obj) => {
            return obj[property] == string1 || obj[property] == string2;
        });
        return filteredObj;
    };
    const randomRollObject = (object) => {
        return object[Math.floor(Math.random() * object.length)];
    };

    let atkStrat = randomRollObject(filterObject(strats, 'type', 'attack', 'all'));
    let defStrat = randomRollObject(filterObject(strats, 'type', 'defend', 'all'));

    const embed = new Discord.RichEmbed()
        .addField('  *** Attack: ' + atkStrat.name + '! ***', atkStrat.strat)
        .addField('  *** Defend: ' + defStrat.name + '! ***', defStrat.strat)
        .setFooter('[Attack Type: ' + atkStrat.type + '] | [Defence Type: ' + defStrat.type + ']');
    msg.channel.send({ embed });
    msg.delete(msg);
};

module.exports.help = {
    name: prefix+'strat'
};
