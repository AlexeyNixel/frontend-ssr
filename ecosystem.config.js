module.exports = {
  apps: [
    {
      name: 'nuxt-app', // Имя приложения
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start', // Запуск приложения Nuxt

      // Указываем общие переменные окружения, если нужно
      env: {
        NODE_ENV: 'development',
      },

      // Указываем файл .env, который должен быть загружен
      env_file: '.env', // Путь к файлу .env, который находится в корне проекта

      post_deploy: ['npm install', 'npm run build', 'pm2 restart nuxt-app'],
    },
  ],
};
