module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      post_deploy: ['npm install', 'npm run build', 'pm2 restart nuxt-app'],
    },
  ],

  deploy: {
    production: {
      user: 'admin_web',
      host: '192.168.0.35', // IP или домен сервера
      ref: 'origin/main', // Ветка, на которую будем делать деплой
      repo: 'https://github.com/AlexeyNixel/frontend-ssr.git', // URL репозитория
      path: '/home/admin_web/infomania-web/frontend', // Путь на сервере, куда будет клонирован репозиторий
      'post-deploy': 'npm install && npm run build && pm2 restart nuxt-app', // Действия после деплоя
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
