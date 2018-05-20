const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {


  
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

    message.channel.send(colorembed)
};
module.exports.help = {
    name: "randomcolor"
}
