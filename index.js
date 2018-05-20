/*
Welcome to ElemBot!
This is a discord bot, and we will publish this bot later.
*/
const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const eightball = require('./commands/8ball.js') 
const bot = new Discord.Client();
const fs = require('fs');
bot.commands = new Discord.Collection();

let xp = require('./xp.json');


fs.readdir("./commands", (err, files) => {
  if(err) console.error(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands. :(");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});



bot.on("ready", async () => {
  console.log(`ElemBot is online!`);
  bot.user.setActivity("Visual Studio Code.");
});
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 275;
  xp[message.author.id].xp = curxp + xpAdd;

  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor('#42f48f')
    .addField("New Level:", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(10000)})
  }
  fs.writeFile('./xp.json', JSON.stringify(xp), (err) => {
    if(err) console.log(err);
  })
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.splice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));


  if(commandfile) commandfile.run(bot, message, args)
  if(cmd == `${prefix}serverinfo`){
    let sicon = message.guild.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Info!")
    .setColor("#a139c8")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.guild.joinedAt)
    .addField("Total Members", message.guild.memberCount);
    return message.channel.send(serverembed);


    return message.channel.send(botembed);
  }

  if(cmd == `${prefix}botinfo`){
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Info!")
    .setColor("#a139c8")
    .setThumbnail(bicon)
    .addField("Bot Name", "ElemBot")
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
  }
  if(cmd == `${prefix}8ball`){
    if(!args[2]) return message.reply("Your question isn't long enough to be answered. :(");
    let replies = ['Yes. Definitely. Without a doubt. 100%.', 'Most likely.', "Can't predict now.", 'Most likely not.', 'Not necessarily', "Nope. Definitely not. Uh-uh. 0%."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("a139c8")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    // message.channel.send(ballembed);  
  }
  if(cmd == 'SpicyApples'){
    let replies = ['Salty bananas.', 'Sweet potato.', 'Sour plum.', 'Rude peach.'];

    let result = Math.floor((Math.random() * replies.length));
    let result2 = replies[result];
    let question = args.slice(1).join(" ");
    message.channel.send(`spicy apples indeed, ${message.author}. ${result2}.`)

  }
  if(cmd == 'oof'){
    var img = 'https://i.ytimg.com/vi/VRNXhePvt40/maxresdefault.jpg';
    message.channel.send(img)

  }
  if(cmd == `${prefix}randomcolor`){
    var hexVal = ['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6'];
    var first = Math.floor(Math.random() * hexVal.length);
    var second = Math.floor(Math.random() * hexVal.length);
    var third = Math.floor(Math.random() * hexVal.length);
    var fourth = Math.floor(Math.random() * hexVal.length);
    var fifth = Math.floor(Math.random() * hexVal.length);
    var sixth = Math.floor(Math.random() * hexVal.length);
    var res = `#${hexVal[first]}${hexVal[second]}${hexVal[third]}${hexVal[fourth]}${hexVal[fifth]}${hexVal[sixth]}`
    let colorembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor(res)
    .addField("Color in Hex", res)
    .addField("Note", "The color at the left of this embed is your random color.");

    // message.channel.send(colorembed);  
  }

  if(cmd == `${prefix}8ball`){
    if(!args[2]) return message.reply("Your question isn't long enough to be answered. :(");
    let replies = ['Yes. Definitely. Without a doubt. 100%.', 'Most likely.', "Can't predict now.", 'Most likely not.', 'Not necessarily', "Nope. Definitely not. Uh-uh. 0%."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("a139c8")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    // message.channel.send(ballembed);  
  }
  

})

bot.login(botconfig.token);
