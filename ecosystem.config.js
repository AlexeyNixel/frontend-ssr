module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',

      env: {
        NODE_ENV: 'development',
      },

      env_file: '.env', // Подключаем .env файл

      post_deploy: ['npm install', 'npm run build', 'pm2 restart nuxt-app'],
    },
  ],
};
