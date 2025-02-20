module.exports = {
  apps: [
    {
      name: 'frontend',
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
      post_deploy: [
        'npm install', 
        'npm run build', 
        'pm2 restart nuxt-app', 
      ],
    },
  },
};