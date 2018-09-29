const {prefix, token} = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

/*TODO: multi-tag r34
thot-meter: measures how much of a thot something is
percentage chance you die today

*/

// reads the "commands" directory, which is where we store our commands
fs.readdir('./commands', (err, files) => {
  if(err) console.error(err);

  //checks to see if the file ends in .js
  //splits file name on ., pops the last value in the array and checks if its 'js'
  let jsFiles = files.filter(file => file.split('.').pop() === 'js');

  if(jsFiles.length <= 0) {
    console.log('No commands to load');
    return;
  }

  console.log(`Loading ${jsFiles.length} commands!`);

  jsFiles.forEach((file, index) => {
    let props = require(`./commands/${file}`);
    console.log(`${index + 1}: ${file} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on('ready', async () => {
  console.log(`Bot is ready! ${bot.user.username}`);

  try {
    let link = await bot.generateInvite(['ADMINISTRATOR']);
    console.log(link);
  } catch(e) {
    console.log(e.stack);
  }

});


bot.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  let messageArray = message.content.split(' ');
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;

  //gets us the command without the prefix
  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot, message, args);


});

bot.login(token);
