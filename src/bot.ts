import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { CommandHandle } from './Events/commandHandle';
import { Interaction } from './Events/Interaction';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv'
dotenv.config()

try {
    const prisma = new PrismaClient()
    CommandHandle.registerCommands({
        CLIENT_ID: process.env.CLIENT_ID,
        GUILD_ID: process.env.GUILD_ID,
        TOKEN: process.env.TOKEN
    });

    const client = new Client({ intents: [GatewayIntentBits.Guilds] })
    client.commands = new Collection();
    client.events = new Collection();

    client.on('ready', () => {
        console.log(`Logged in as ${client.user?.tag}`);
    });

    // LOAD COMMANDS
    CommandHandle.loadCommands(client);
    Interaction.Create(client, prisma)


    client.login(process.env.TOKEN)
} catch (error) {
    console.log(error)
}