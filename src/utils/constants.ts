export const ERROR_BED_REQUEST = {
    code: 400,
    message: 'Переданы некорректные данные',
    messageTelegram: 'Чат не существует или переданы некорректные данные',
};
export const ERROR_NOT_FOUND = {
    code: 404,
    messageUser: 'Данный пользователь не существует',
    messageEstate: 'Объект недвижимости не существует',
    messageTelegram: 'Токен бота прострочен или не существует',
    messageContent: 'Данного контента не существует',
};
export const ERROR_INTERNAL_SERVER = {
    code: 500,
    message: 'Сервер не отвечает',
};
export const secretKey = 'salt-salt-salt';
export const baseUrlTelegramAPI = 'https://api.telegram.org/bot';
export const imgList = ['.png', '.jpg', '.jpeg', '.gif'];
