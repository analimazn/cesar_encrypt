async function decryptFile(file) {
    if (file) {
        const encryptPhrase = file.cifrado.toLowerCase()
        const letters = "abcdefghijklmnopqrstuvwxyz"
        var decryptPhrase = ''

        encryptPhrase.split('').forEach((char, idx) => {
            if (letters.includes(char)) {
                let charCode = char.charCodeAt(0)
                charCode--
                let newChar = String.fromCharCode(charCode)
                decryptPhrase += newChar
            } else {
                decryptPhrase += char
            }
        })
        return decryptPhrase
    }
}

module.exports = {
    decryptFile
}