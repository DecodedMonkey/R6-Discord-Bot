const prefix = process.env.BOT_PREFIX;
module.exports.run = async (bot, msg, cmd, args) => {
    console.log(args);
    console.log('Testing ran!');
};

module.exports.help = {
    name: prefix+'tester'
};
