const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    
   let pUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!pUser) return message.channel.send("User doesn't exist to get promoted!");
   let pReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("No, can do!"); 
   let promoteEmbed = new Discord.RichEmbed()
   .setDescription('Promotion')
   .setColor('#42d4f4')
   .addField("Promoted User:", `${pUser} with ID ${pUser.id}`)
   .addField("Promoted By:", `<@${message.author.id}> with ID ${message.author.id}`)
   .addField("Promoted In:", message.channel)
   .addField("Time:", message.createdAt)
   .addField("Reason:", pReason);

   let kickChannel = message.guild.channels.find(`name`, "promotes-and-demotes");
   
    // message.guild.member(kUser).kick(kReason);
    kickChannel.send(promoteEmbed);

    return;
}

module.exports.help = {
    name: "promote"
}
