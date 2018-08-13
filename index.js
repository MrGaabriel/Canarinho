const Discord = require("discord.js");
const client = new Discord.Client();

const readdir = require("readdir");
require("dotenv").config();

const colors = require("colors");

let token = process.env.TOKEN;

client.ownerId = process.env.OWNER_ID;
client.prefix = process.env.COMMAND_PREFIX;

client.login(token).then(() => {
   console.log(`Logado com sucesso! ${client.user.tag}`);
}).catch(err => {
    console.log(`Erro ao logar! ${err}`);
});

let commandsFolder = readdir.readSync("./commands/");

// TODO Remover gambiarra
let registerCommands = async () => {
    console.log(`Carregando ${commandsFolder.length} comandos da pasta ./commands/`);

    commandsFolder.forEach(file => {
       let commandName = file.replace(".js", "");
       let command = require(`./commands/${file}`);

       client.on("message", message => {
           let contentSplitted = message.content.split(" ");
           let args = contentSplitted.join(" ").substring(contentSplitted[0].length + 1).split(" ");

           if (contentSplitted[0].toLowerCase() === client.prefix + commandName) {
               try {
                   let start = Date.now();
                   console.log(`${"[COMMAND EXECUTED]".yellow} (${message.guild.name} -> #${message.channel.name}) ${message.author.tag} -> ${message.content}`);

                   command.run(message, args);

                   console.log(`${"[COMMAND STATUS]".yellow} (${message.guild.name} -> #${message.channel.name}) ${message.author.tag} -> ${message.content} - OK! Finished in ${Date.now() - start}ms`);
               } catch (err) {
                   console.log(`${"[COMMAND STATUS]".yellow} (${message.guild.name} -> #${message.channel.name}) ${message.author.tag} -> ${message.content} - ERROR! ${err}`);
               }
           }
       });
    });
};

registerCommands();