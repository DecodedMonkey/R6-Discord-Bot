const prefix = process.env.BOT_PREFIX;
const operators = require('../operators.json');

module.exports.run = async (bot, msg, cmd, args) => {
    let attackers = Object.values(operators).map(a => a.Attackers);
    attackers = attackers.toString().split(',');
    shuffle(attackers);

    let defenders = Object.values(operators).map(a => a.Defenders);
    defenders = defenders.toString().split(',');
    shuffle(defenders);

    if (args[0]) {
        if (parseInt(args[0]) > 19) {
            msg.channel.send('NO!', { code: 'HTTP' });
            return;
        }
        let message = '';
        for (let i = 0; i < parseInt(args[0])-1; i++) {
            // let rollAttacker = attackers[Math.floor(Math.random() * attackers.length) || 'Ash'];
            // let rollDefender = defenders[Math.floor(Math.random() * defenders.length)] || 'Rook';
            let rollAttacker = attackers[i];
            let rollDefender = defenders[i] || 'WILDCARD';
            message += `Attacker: ${rollAttacker} \nDefender: ${rollDefender} \n\n`;
        }
        message += `${parseInt(args[0])} operators have been rolled!`;
        msg.channel.send(message, { code: 'HTTP' });
    } else {
        let rollAttacker = attackers[Math.floor(Math.random() * attackers.length)] || 'Ash';
        let rollDefender = defenders[Math.floor(Math.random() * defenders.length)] || 'Rook';

        msg.channel.send(`Attacker: ${rollAttacker} \nDefender: ${rollDefender}`, { code: 'HTTP' });
    }
};

module.exports.properties = {
    name: prefix+'roll',
    cmd: [prefix+'roll']
};


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
