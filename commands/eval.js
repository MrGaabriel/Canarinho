class EvalCommand {

    static run(message, args) {
        if (message.author.id !== client.ownerId) {
            message.channel.send(`${message.author} Somente o dono do bot pode usar este comando!`);
            return;
        }

        if (args.length === 0) {
            message.channel.send(`${message.author} Use \`c!eval código\`!`);
            return;
        }

        let code = args.join(" ");

        try {
            let evaluated = eval(code);

            message.channel.send("```" + evaluated + "```");
        } catch (err) {
            const Discord = require("discord.js");

            let embed = new Discord.RichEmbed();

            embed.setTitle("Ih serjão sujou!");
            embed.setDescription("```" + err + "```");
            embed.setColor("RANDOM");
            embed.setFooter("Oopsie Woopsie");

            message.channel.send({embed: embed});
        }
    }

}

module.exports = EvalCommand;