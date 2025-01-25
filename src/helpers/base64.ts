import fs from 'node:fs/promises'

async function base64ToFile(base64String: string) {
    // make temp file
    let tempFile = '/tmp/temp.mp3'

    console.log(tempFile)
    // fs.writeFile(tempFile, Buffer.from(await soundFile.arrayBuffer()))

    const buffer = Buffer.from(base64String, 'base64');

    await fs.writeFile(tempFile, buffer);

    console.log(tempFile)

    return tempFile
}

export { base64ToFile}