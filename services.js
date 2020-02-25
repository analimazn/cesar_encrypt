require('dotenv').config()
const axios = require('axios')
const fetch = require('node-fetch')
const fs = require('fs')
const FormData = require('form-data')

async function getJson() {
    const token = process.env.TOKEN
    const url = process.env.API_CODENATION

    try {
        const response = await axios.get(`${url}generate-data`, {
            params: {
                token: token
            }
        })
        await saveFile(JSON.stringify(response.data))
    } catch(err) {
        console.log(err)
    }
}

async function saveFile(file) {
    try {
        if (fs.existsSync('./answer.json')) {
            console.log("File exists")
        } else {
            await fs.writeFile('answer.json', file, (err) => {
                if (err) throw err
            })
        }
    } catch (err) {
        console.log(err)
    }
}

async function getFile() {
    try {
        if (fs.existsSync('./answer.json')) {
            return JSON.parse(fs.readFileSync('answer.json', 'utf8'))
        } else {
            getJson()
        }
    } catch (err) {
        console.log(err)
    }
}

async function setFile(content) {
    try {
        return await fs.writeFileSync('answer.json', JSON.stringify(content));
    } catch (err) {
        console.log(err)
    }
}

async function sendFile() {
    const token = process.env.TOKEN
    const url = process.env.API_CODENATION
    const file = await fs.createReadStream('./answer.json')
    let bodyFormData = new FormData();

    bodyFormData.append('answer', fs.createReadStream('./answer.json'))

    try {
        const response = await fetch(`${url}submit-solution?token=${token}`, { 
            method: 'POST', 
            body: bodyFormData 
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    getJson,
    getFile,
    setFile,
    sendFile
}