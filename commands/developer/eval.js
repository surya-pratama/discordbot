const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { inspect } = require("node:util");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Evaluasi kode pemrograman")
        .addStringOption(option => 
            option.setName("kode-program")
                .setDescription("Kode pemrograman berbasis JavaScript")
                .setRequired(true)
        ),
    async execute(interaction) {
        const code = interaction.options.getString("kode-program");
        const embed = new EmbedBuilder().setColor(Colors.Yellow);

        await interaction.deferReply();

        try {
            const evaled = await eval(code);

            embed.setTitle("Output 📝")
            embed.setDescription(`\`\`\`js\n${clean(evaled)}\`\`\``);

            await interaction.editReply({ embeds: [embed] });
        }
        catch(error) {
            embed.setColor(Colors.Red);
            embed.setTitle("Error!")
            embed.setDescription(`\`\`\`js\n${clean(error)}\`\`\``);

            await interaction.editReply({ embeds: [embed] })
        }
        return;
    }
}

function clean(code) {
    if  (typeof code === "string") {
        return code
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
    }
    else {
        return inspect(code, { depth: 0 });
    }
};