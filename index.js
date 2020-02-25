const { getJson, getFile, setFile, sendFile } = require('./services.js')
const { decryptFile } = require('./utils.js')
const sha1 = require('sha1')

async function app() {
    try {
        const file = await getFile()
        const decryptPhrase = await decryptFile(file)

        if (file) {
            const resume = sha1(decryptPhrase)
            file.decifrado = decryptPhrase
            file.resumo_criptografico = resume

            await setFile(file)

            const response = await sendFile()
            console.log(response)
        }
    } catch (err) {
        console.log(err)
    }
}

app()