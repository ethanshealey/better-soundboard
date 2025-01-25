import { joinVoiceChannel } from "@discordjs/voice";
import { ButtonInteraction, CacheType, CommandInteraction } from "discord.js";

const join = async (interaction: ButtonInteraction<CacheType> | CommandInteraction) => {
    const member = await interaction.guild?.members.fetch(interaction.user.id)

    const connection = joinVoiceChannel({
        channelId: member?.voice.channelId ?? '',
        guildId: interaction.guildId ?? '',
        adapterCreator: interaction.guild?.voiceAdapterCreator,
    });

    return connection
}

export { join }