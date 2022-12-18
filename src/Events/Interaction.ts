import { Client, Events } from "discord.js";
import { PrismaClient } from '@prisma/client';


export class Interaction {
    static async Create(client: Client, prisma: PrismaClient) {
        client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {

                const user = await prisma.user.findUnique({
                    where: {
                        id: interaction.user.id
                    }
                })

                if (!user) {
                   await prisma.user.create({
                        data: {
                            id: interaction.user.id,
                            username: interaction.user.username,
                            Coin: 0
                        }
                    })

                    console.log("NOVO USUARIO REGISTRADO!")
                }

                await command.execute(interaction, prisma);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });
    }
}