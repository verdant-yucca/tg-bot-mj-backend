import User from '../models/user';

export const updateCountFreeQueriesForAllUsers = async (freeQueries: string) => {
    try {
        const allUsers = await User.find();
        allUsers.forEach(async user => {
            try {
                if ('countFreeQueries' in user) {
                    user.countFreeQueries = freeQueries;
                    await user.save();
                }
            } catch (e) {
                console.error('Не удалось обновить значение у юзера: ', user._id);
            }
        });
    } catch (e) {
        console.error('Обновление бесплытных запросов не выполнено!');
    }
};
