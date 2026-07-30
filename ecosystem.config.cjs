module.exports = {
  apps: [
    {
      name: 'Frontend',
      script: './.output/server/index.mjs',
      cwd: __dirname,
      env: {
        VITE_BASE_URL: 'http://api.infomania.ru',
        VITE_STATIC_URL: 'http://static.infomania.ru',
      },
    },
  ],
  deploy: {
    production: {
      user: 'admin_web',
      host: ['192.168.0.35'],
      ref: 'origin/master',
      repo: 'https://github.com/AlexeyNixel/frontend-ssr.git',
      path: '/home/admin_web/infomania-web/frontend',
      'post-deploy':
        'npm i && npm run build && pm2 restart ecosystem.config.cjs',
    },
  },
};
