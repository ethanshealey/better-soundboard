import { ButtonInteraction, CacheType } from "discord.js"
import { createAudioPlayer, createAudioResource, NoSubscriberBehavior, joinVoiceChannel, AudioPlayerStatus } from "@discordjs/voice"
import { join } from "./helpers/voiceHelpers"
import { base64ToFile } from "./helpers/base64"

export default async (interaction: ButtonInteraction<CacheType>, customId: string) => {
    // get sound id
    const soundId = customId.toString().split("-")[1]

    // get sound from api
    const res = await fetch('http://soundboard.ethanshealey.com/api/v1/sounds/' + soundId)
    const sound = await res.json()

    const player = createAudioPlayer()

    const soundFile = await base64ToFile(sound.sound.file)

    const resource = createAudioResource(soundFile)

    const connection = await join(interaction)

    player.play(resource);
    connection.subscribe(player)

    player.on(AudioPlayerStatus.Playing, () => {
        console.log('Playing sound')
    })

    await interaction.deferUpdate()
    // await interaction.reply({ content: "Playing sound '" + sound.sound.name + "'", ephemeral: true });
}