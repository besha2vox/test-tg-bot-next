import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const token = '6377028754:AAFbD_zFXiz-oig2NiXzjpa9JsTvYR-RgYc';
const usersUrl = 'https://64a87eb0dca581464b85cca1.mockapi.io/users';

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([{ command: '/start', description: 'Start' }]);

export const start = async () => {
    await bot.start();
};

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const name = msg.chat.first_name;

    await bot.sendMessage(
        chatId,
        `Привіт, ${name}, я ваш телеграм-бот Junfolio.\nТут я буду надавати вам інформацію про нові проєкти.`
    );

    try {
        const response = await axios.get(`${usersUrl}?telegramId=${chatId}`);
        const existingUser = response.data[0];

        if (existingUser) {
            bot.sendMessage(chatId, `Ви вже авторизовані`);
        } else {
            bot.sendMessage(
                chatId,
                'Введіть ваш нік на нашій платформі Junfolio'
            );

            bot.on('message', async (msg) => {
                const text = msg.text;

                if (text === '/start') return;

                if (text) {
                    const response = await axios.get(
                        'https://64a87eb0dca581464b85cca1.mockapi.io/users'
                    );
                    const currentUser = response.data.find(
                        ({ username }) => username === text
                    );

                    let isCycleActive = true;
                    while (true) {
                        if (!currentUser) {
                            bot.sendMessage(
                                chatId,
                                `Користувач з ніком ${text} не зареєстрований.\nСпробуйте ще раз відправити нік, або введіть stop для зупинення процесу авторизації`
                            );
                        }

                        if (text === 'stop') {
                            bot.sendMessage(chatId, 'Авторизація зупинена');
                            isCycleActive = false;
                            break;
                        }

                        const user = await axios.patch(
                            `${usersUrl}/${currentUser.id}`,
                            { telegramId: chatId }
                        );
                        bot.sendMessage(chatId, `Ви успішно авторизовані!`);
                        isCycleActive = false;
                    }
                }
            });
        }
    } catch (error) {
        console.error('Помилка при взаємодії з DB', error);
    }
});

export const handlerAdd = async (req, res) => {
    if (req.method === 'POST') {
        const response = await axios.get(
            'https://64a87eb0dca581464b85cca1.mockapi.io/users'
        );
        const telegramIds = response.data.map(({ telegramId }) => telegramId);
        const { message } = req.body;

        telegramIds.forEach((telegramId) => {
            if (typeof telegramId !== 'number') return;
            bot.sendMessage(telegramId, message);
        });
        res.status(200).json({ message: 'Повідомлення надіслано' });
    } else {
        res.status(405).json({ error: 'Метод не дозволений' });
    }
};

export default bot;
