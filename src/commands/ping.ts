import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { PrismaClient } from '@prisma/client';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Retorna Pong!'),
    async execute(interaction: ChatInputCommandInteraction) {
        const prisma = new PrismaClient()

        const user = await prisma.user.findMany()

        console.log(user)

        await interaction.reply(JSON.stringify(user));
    },
};