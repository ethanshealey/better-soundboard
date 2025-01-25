import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, CommandInteraction, ContextMenuCommandBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";
import split from "../helpers/splitArray";
import { join } from "../helpers/voiceHelpers";

export const data = new SlashCommandBuilder()
  .setName("sb")
  .setDescription("Open the Soundboard");

export async function execute(interaction: CommandInteraction) {


  // Step 1: Get voice channel
  const connection = await join(interaction)

  const res = await fetch('http://soundboard.ethanshealey.com/api/v1/sounds')
  const data = await res.json()

  const buttons: any[] = data.sounds.map((sound: any) => {
    return new ButtonBuilder()
      .setCustomId(`SOUND-${sound.id}`)
      .setLabel(sound.name)
      .setStyle(ButtonStyle.Primary)
  })

  const rows = split(buttons, 3).map((row) => {
    return new ActionRowBuilder().addComponents(...row)
  })

  // interaction.deferReply({ ephemeral: true });

  return interaction.reply({ components: [ ...rows ] });

}


