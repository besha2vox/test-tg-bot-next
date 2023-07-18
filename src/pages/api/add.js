import { handlerAdd } from '@/service/telegramAPI';

export default function handler(req, res) {
    handlerAdd(req, res);

    res.status(200).json({ message: 'Телеграм-бот запущено' });
}
