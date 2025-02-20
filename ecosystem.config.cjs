module.exports = {
  apps: [
    {
      name: 'Frontend',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
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
