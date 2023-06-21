const { Colors, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { execSync } = require("node:child_process");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("exec")
        .setDescription("Menjalankan perintah shell")
        .addStringOption(option =>
            option.setName("perintah")
                .setDescription("CLI / GUI")
                .setRequired(true)
        ),
    async execute(interaction) {
        const command = interaction.options.getString("perintah");
        const embed = new EmbedBuilder().setColor(Colors.Green);

        await interaction.deferReply();

        try {
            const _execute = execSync(command);
            embed.setTitle(`$ ${command}`)
            embed.setDescription(`\`\`\`shell\n${_execute}\`\`\``);

            await interaction.editReply({ embeds: [embed] });
            return;
        }
        catch(error) {
            embed.setColor(Colors.Red);
            embed.setDescription(`Tidak dapat menjalankan perintah \`$ ${command}\`, karena \`${error.message}\`.`);

            await interaction.editReply({ embeds: [embed], ephemeral: true });
            return;
        }
    }
}