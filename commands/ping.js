class PingCommand {

    static run(message, args) {
        message.channel.send(`${message.author} Pong! \`${message.client.ping}ms\`!`);
    }

}

module.exports = PingCommand;