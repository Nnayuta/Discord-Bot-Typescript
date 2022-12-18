import { Client, REST, Routes } from "discord.js";
import fs from "node:fs";
import path from "node:path";

interface commandProps {
    data: {
        options: []
        name: 'string'
        name_localizations: any
        description: string
        description_localizations: any
        default_permission: any
        default_member_permissions: any
        dm_permission: any
    },
    execute: () => Promise<any>
}

export class CommandHandle {
    static async loadCommands(client: Client) {

        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = await import(filePath) as commandProps

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command)
                console.log(`Loaded Command: ${command.data.name}`)
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }

    }

    static async registerCommands({ CLIENT_ID, GUILD_ID, TOKEN }: { CLIENT_ID: string, GUILD_ID: string, TOKEN: string }) {
        try {
            const commands: commandProps[] = []
            const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter((file: string) => file.endsWith('.ts'));

            for (const file of commandFiles) {
                const command = await import(path.join(__dirname, '../commands', file))
                commands.push(command.data.toJSON())
            }

            const rest = new REST({ version: '10' }).setToken(TOKEN);

            try {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                    { body: commands },
                );

                console.log(`Comandos registrados`)
            } catch (error) {
                throw error
            }


        } catch (error) {
            console.log(error)
        }
    }
}