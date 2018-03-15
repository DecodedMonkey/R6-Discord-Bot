require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const operators = require('./operators.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const send = (message, object = {}) => msg.channel.send(message, object);
    const reply = (message, object = {}) => msg.channel.send(message, object);
    if (msg.content === '.ping') {
        reply('pong!');
    }
    //Operator Information CMDs
    let opInfo;
    if (operators[msg.content]) {
        opInfo = `${operators[msg.content].Name} 
        \nAttackers: "${operators[msg.content].Attackers.toString().replace(/,/g, '" & "')}"`+
        `\nDefenders: "${operators[msg.content].Defenders.toString().replace(/,/g, '" & "')}"`;
    }
    switch (msg.content) {
    case 'FBI':
    case 'SAS':
    case 'GIGN':
    case 'SPET':
    case 'GSG9':
    case 'JTF2':
    case 'NAVY':
    case 'BOPE':
    case 'SAT':
    case 'SDU':
    case 'GROM':
    case 'SMB':
    case 'GEO':
        send(opInfo, { code: 'HTTP' });
        break;
    //Special Cases for User Ease of Use
    case 'SEAL':
        opInfo = `${operators.NAVY.Name} 
        \nAttackers: "${operators.NAVY.Attackers.toString().replace(/,/g, '" & "')}"` +
        `\nDefenders: "${operators.NAVY.Defenders.toString().replace(/,/g, '" & "')}"`;
        send(opInfo, { code: 'HTTP' });
        break;
    case '707TH SMB':
        opInfo = `${operators.SMB.Name} 
        \nAttackers: "${operators.SMB.Attackers.toString().replace(/,/g, '" & "')}"` +
        `\nDefenders: "${operators.SMB.Defenders.toString().replace(/,/g, '" & "')}"`;
        send(opInfo, { code: 'HTTP' });
        break;
    case '707':
        opInfo = `${operators.SMB.Name} 
        \nAttackers: "${operators.SMB.Attackers.toString().replace(/,/g, '" & "')}"` +
        `\nDefenders: "${operators.SMB.Defenders.toString().replace(/,/g, '" & "')}"`;
        send(opInfo, { code: 'HTTP' });
        break;
    case '707TH':
        opInfo = `${operators.SMB.Name} 
        \nAttackers: "${operators.SMB.Attackers.toString().replace(/,/g, '" & "')}"` +
        `\nDefenders: "${operators.SMB.Defenders.toString().replace(/,/g, '" & "')}"`;
        send(opInfo, { code: 'HTTP' });
        break;
    case 'JW GROM':
        opInfo = `${operators.GROM.Name} 
        \nAttackers: "${operators.GROM.Attackers.toString().replace(/,/g, '" & "')}"` +
        `\nDefenders: "${operators.GROM.Defenders.toString().replace(/,/g, '" & "')}"`;
        send(opInfo, { code: 'HTTP' });
        break;
    case 'ALL':
    //
        break;
    //END of OP INFO
    case '.roll': {
    //
        break;
    }
    case '.strat': {
    //
        break;
    }
    default:
        break;
    } //End Switch
});

client.login(process.env.BOT_TOKEN);
