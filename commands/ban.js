const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    
   let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!bUser) return message.channel.send("User doesn't exist!");
   let bReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No, can do!"); 
   if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot swing the ban hammer to this person."); 
   let banEmbed = new Discord.RichEmbed()
   .setDescription('~Ban~')
   .setColor('#720000')
   .addField("Kicked User:", `${bUser} with ID ${bUser.id}`)
   .addField("Kicked By:", `<@${message.author.id}> with ID ${message.author.id}`)
   .addField("Kicked In:", message.channel)
   .addField("Time:", message.createdAt)
   .addField("Reason:", bReason);

   let banChannel = message.guild.channels.find(`name`, "incidents");
   
    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);

    return;
}

module.exports.help = {
    name: "kick"
}