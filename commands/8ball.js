const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {


  
    if(!args[2]) return message.reply("Your question isn't long enough to be answered. :(");
    let replies = ['Yes. Definitely. Without a doubt. 100%.', 'Most likely.', "Can't predict now.", 'Most likely not.', 'Not necessarily', "Nope. Definitely not. Uh-uh. 0%."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setDescription('~Ban~')
    .setAuthor(message.author.tag)
    .setColor("a139c8")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballembed);
};

module.exports.help = {
    name: "8ball"
}
