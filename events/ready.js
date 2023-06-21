const { ActivityType, Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity({ name: '@surya_pratama', type: ActivityType.Listening })
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};