module.exports = {
    apps: [
        {
            name: 'backend',
            script: './dist/app.js', // Путь к файлу вашего приложения
            watch: false, // Автоматически перезапускать при изменениях в файлах
            env: {
                PORT: 3000,
            },
        },
    ],
};
