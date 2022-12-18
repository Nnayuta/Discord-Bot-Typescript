import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { PrismaClient } from '@prisma/client';

const cointToGet = 10

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription(`Ganha ${cointToGet} coins`),
    async execute(interaction: ChatInputCommandInteraction, prisma: PrismaClient) {

        const user = await prisma.user.findUnique({
            where: {
                id: interaction.user.id
            }
        })
        
        const updatedUser = await prisma.user.update({
            where: {
                id: interaction.user.id
            },
            data: {
                Coin: Number(user?.Coin) + cointToGet
            }
        })

        await interaction.reply(`Você recebeu +10 Coin agora tem ${updatedUser.Coin}`);
    },
};