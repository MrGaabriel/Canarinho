class AvatarCommand {
    static run(message, args) {
		const Discord = require("discord.js");

		let embed = new Discord.RichEmbed();

		embed.setTitle(message.author.tag);
		embed.setColor("RED");
		embed.setImage(message.author.displayAvatarURL);

        message.channel.send({embed: embed});
    }

}

module.exports = AvatarCommand;
