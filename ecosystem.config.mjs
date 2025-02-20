module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      post_deploy: ['npm install', 'npm run build', 'pm2 restart nuxt-app'],
    },
  ],
};
