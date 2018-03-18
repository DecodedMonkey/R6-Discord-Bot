const prefix = process.env.BOT_PREFIX;
const operators = require('../operators.json');
//clearChar is a Zero Width Space (U+200B)
const clearChar = String.fromCharCode(8203);

module.exports.run = async (client, msg, cmd, args) => {
    const send = (message, object = {}) => msg.channel.send(message, object);
    // const reply = (message, object = {}) => msg.channel.send(message, object);
    if (args.length > 2) {
        return;
    }
    if (cmd === 'ALL' || cmd === prefix+'operators') {
        let allOpsInfo = '';
        Object.values(operators).forEach(unit => {
            allOpsInfo += `${unit.Name}` +
                `\nAttackers: "${unit.Attackers.toString().replace(/,/g, '" & "')}"` +
                `\nDefenders: "${unit.Defenders.toString().replace(/,/g, '" & "')}"\n${clearChar}\n`;
        });
        send(allOpsInfo, { code: 'HTTP' });
    } else if (args.length < 2) {
        /*Special Cases for User Ease of Use*/
        switch (msg.content) {
        case 'SEAL':
            cmd = 'NAVY';
            break;

        case '707th SMB':
        case '707':
        case '707th':
            cmd = 'SMB';
            break;
        case 'JW GROM':
            cmd = 'GROM';
            break;
        case 'ALL':
        //
            break;
        default:
            break;
        }
        let opInfo;
        if (operators[cmd]) {
            opInfo = `${operators[cmd].Name} 
        \nAttackers: "${operators[cmd].Attackers.toString().replace(/,/g, '" & "')}"` +
            `\nDefenders: "${operators[cmd].Defenders.toString().replace(/,/g, '" & "')}"`;
        }

        if (opInfo) {
            send(opInfo, { code: 'HTTP' });
        }
    }
};

module.exports.properties = {
    name: prefix+'operators',
    cmd: ['FBI', 'SAS', 'GIGN', 'SPET', 'GSG9', 'JTF2', 'NAVY', 'BOPE', 'SAT', 'SDU', 'GROM', 'SMB', 'GEO', /*Special Cases for User Ease of Use*/ 'SEAL', '707th SMB', '707', '707th', 'JW GROM', 'ALL']
};

