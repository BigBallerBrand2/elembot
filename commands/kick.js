const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    
   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!kUser) return message.channel.send("User doesn't exist!");
   let kReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No, can do!"); 
   if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot kick this person out."); 
   let kickEmbed = new Discord.RichEmbed()
   .setDescription('~Kick~')
   .setColor('#720000')
   .addField("Kicked User:", `${kUser} with ID ${kUser.id}`)
   .addField("Kicked By:", `<@${message.author.id}> with ID ${message.author.id}`)
   .addField("Kicked In:", message.channel)
   .addField("Time:", message.createdAt)
   .addField("Reason:", kReason);

   let kickChannel = message.guild.channels.find(`name`, "incidents");
   
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
}

module.exports.help = {
    name: "kick"
}