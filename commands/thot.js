const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  if(!args[0]) return;

  let thotPercent = Math.floor(Math.random() * 100) + 1;

  message.channel.send(`${args[0]} is ${thotPercent}% thot`);
}

module.exports.help = {
  name: 'thot'
}
