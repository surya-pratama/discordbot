const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mengirim latensi server hosting'),
    async execute(interaction) {
        const timestamp = await Date.now();
        await interaction.reply({ content: "Ping?!...", ephemeral: true });

        await interaction.editReply(`Pong! **${timestamp - interaction.createdTimestamp}** ms`);
        return;
    },
};