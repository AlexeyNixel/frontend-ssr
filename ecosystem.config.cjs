module.exports = {
  apps: [
    {
      name: 'frontend',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      // Это укажет PM2 запускать команду после деплоя
      post_deploy: [
        'npm install', // Устанавливаем зависимости
        'npm run build', // Собираем проект
        'pm2 restart nuxt-app', // Перезапускаем приложение через PM2
      ],
      watch: false, // Не следим за изменениями (убираем, если не нужно)
    },
  ],
};
