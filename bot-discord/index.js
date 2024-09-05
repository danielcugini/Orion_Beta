
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
//dotenv
const dotenv = require('dotenv')
dotenv.config()
const{TOKEN, CLIENT_ID, GUILD_ID} = process.dotenv

//commands import
const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(_dirname, "commmands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()


for (const file of commandFiles){
	const filePath = path.join(commandsPath , file)
	const command = require(filePath)
	if ("data" in command && "execute" in command ){
		client.commands.set(command.data.name, command)

	}else {
		console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes `)
	}
}



// Login do Bot
client.once(Events.ClientReady, readyClient => {
	console.log(`Pronto! Login Realizado como ${readyClient.user.tag}`)
});


client.login(token)

//Listener de Interações com o Bot
client.on(Events.InteractionCreate, async interaction => {
	if(!interaction.isChatInputCommand()) return
		const command = interatcion.client.commands.get(interaction.commandName)
		if(!command){
			console.error("Comando não encontrado")
			return
		}
	        try {
				await command.execute(interaction)
			}
			catch(error) {
				console.error(error)
				await interaction.reply("Erro ao executar esse comando")

			}
})