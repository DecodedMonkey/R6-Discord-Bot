const prefix = process.env.BOT_PREFIX;
const operators = require('../operators.json');

module.exports.run = async (bot, msg, cmd, args) => {
    let attackers = Object.values(operators).map(a => a.Attackers);
    attackers = attackers.toString().split(',');

    let defenders = Object.values(operators).map(a => a.Defenders);
    defenders = defenders.toString().split(',');
    let id = 0;
    console.log(id < parseInt(args[0]));

    if (args[0]) {
        if (parseInt(args[0]) > 20) {
            msg.channel.send('NO!', { code: 'HTTP' });
            return;
        }
        let message = '';
        for (let i = 0; i < parseInt(args[0]); i++) {
            let rollAttacker = attackers[Math.floor(Math.random() * attackers.length) || 'Ash'];
            let rollDefender = defenders[Math.floor(Math.random() * defenders.length)] || 'Rook';
            message += `Attacker: ${rollAttacker} \nDefender: ${rollDefender} \n\n`;
        }
        message += `${parseInt(args[0])} operators have been rolled!`;
        msg.channel.send(message, { code: 'HTTP' });
    } else {
        let rollAttacker = attackers[Math.floor(Math.random() * attackers.length)];
        let rollDefender = defenders[Math.floor(Math.random() * defenders.length)];

        msg.channel.send(`Attacker: ${rollAttacker} \nDefender: ${rollDefender}`, { code: 'HTTP' });
    }
};

module.exports.help = {
    name: prefix+'roll'
};
