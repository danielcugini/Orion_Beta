const {REST,  Routes} = require("discord.js")

const dotenv = require('dotenv')
dotenv.config()
const{TOKEN, CLIENT_ID, GUILD_ID} = process.dotenv

const fs = require("node:fs")
const path = require("node:path")
const { pathToFileURL } = require("node:url")

const commandsPath = path.join(_dirname, "commmands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const commands = []

for(const file of commandFiles) {
    const commands = require('./commands/${file}')
    commands.push(command.data.toJSON())
}

// REST instance
const rest = new REST({version: 10}).setToken(TOKEN);

//deploy
(async () => {
    try{
        console.log('Resetando ${commands.lengtgh} comandos... ')

        //PUT
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        )
        console.log(`Comandos registrados com sucesso!`)
    }
        catch (error){
            console.error(error)
        }
})