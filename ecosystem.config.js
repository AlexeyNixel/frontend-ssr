module.exports = {
  apps: [
    {
      name: 'frontend', // Имя приложения для PM2
      script: './node_modules/nuxt/bin/nuxt.js', // Путь до Nuxt-скрипта для старта приложения
      args: 'start', // Команда для старта приложения
      env: {
        NODE_ENV: '.env', // Переменные окружения для разработки
      },
      env_production: {
        NODE_ENV: '.env', // Переменные окружения для продакшн
      },
      post_deploy: [
        'npm install', // Установить зависимости
        'npm run build', // Собрать проект
        'pm2 restart nuxt-app', // Перезапустить приложение
      ],
    },
  ],
};
