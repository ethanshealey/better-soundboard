import { Client } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";
import playSound from "./playSound";

const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages", "GuildVoiceStates"],
});

client.once("ready", () => {
    console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
    // if(interaction.guildId) await deployCommands({ guildId: interaction.guildId });

    if(interaction.isButton()) {
        const { customId } = interaction;
        if (customId.toString().includes("SOUND-")) {
            // handle sound play
            playSound(interaction, customId);
        }
    }
    else if(interaction.isCommand()) {
        const { commandName } = interaction;
        if (commands[commandName as keyof typeof commands]) {
            commands[commandName as keyof typeof commands].execute(interaction);
        }
    }
});

client.login(config.DISCORD_TOKEN);


