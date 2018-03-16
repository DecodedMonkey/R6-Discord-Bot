require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');

fs.readdir('./cmds/', (err, files) => {
    if (err) {
        console.error(err);
    }
    let jsFiles = files.filter(file => file.split('.').pop() === 'js');
    if (jsFiles.length <= 0) {
        console.warn('No commands were found!');
        return;
    }
    console.log(`Loading ${jsFiles.length} commands!`);

    jsFiles.forEach((file, index) => {
        let props = require(`./cmds/${file}`);
        console.log(`${index+1}: ${file} loaded!`);
        console.log(props.help.name);
        client.commands.set(props.help.name, props);
    });
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let messageArray = msg.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.splice(1);

    let cmd = client.commands.get(command);

    //check if the given command is an alias for another command
    //TODO: Rename variables
    if (!cmd) {
        client.commands.forEach(el => {
            if (el.help.cmd && el.help.cmd.indexOf(command) > -1) {
                cmd = client.commands.get(el.help.name);
            }
        });
    }
    if (cmd) {
        cmd.run(client, msg, command, args);
    }
});

client.login(process.env.BOT_TOKEN);
