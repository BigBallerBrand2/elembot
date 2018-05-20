const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {


  
    let replies = ["Tails", "Heads"];

    let result = Math.floor((Math.random() * replies.length));
    let coinEmbed = new Discord.RichEmbed()
    .setDescription('Coin Flip')
    .setAuthor(`${message.author.tag}`)
    .setColor("a139c8")
    .addField("Request", "Coin Flip")
    .addField("Answer", `${replies[result]}`);

    message.channel.send(coinEmbed);
};

module.exports.help = {
    name: "coinflip"
}
