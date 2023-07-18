// const axios = require('axios');

// const getTelegramUsername = async () => {
//     console.time();
//     const telegramLink = 'https://t.me/besha2vox';

//     try {
//         const response = await axios.get(telegramLink);
//         const match = response.data.match(/<title>(.*?)<\/title>/i);
//         if (match) {
//             const pageTitle = match[1];
//             const atIndx = pageTitle.indexOf('@');
//             const username = pageTitle.slice(atIndx + 1, pageTitle.length);
//             console.log(username);
//         }
//     } catch (error) {
//         console.error('Помилка при отриманні тайтлу сторінки', error);
//     }
//     console.timeEnd();
// };

// getTelegramUsername();

// const isValidTelegramLink = (url) => {
//     console.time();
//     if (!url.startsWith('https://t.me/')) {
//         return false;
//     }

//     const username = url.split('https://t.me/')[1];

//     if (username.length < 5 || username.length > 32) {
//         return false;
//     }

//     return true;
// };

// const url = 'https://t.me/besha2vox';
// const isValid = isValidTelegramLink(url);

// console.log(isValid);
// console.timeEnd();
