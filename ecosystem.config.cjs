module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ],
  deploy: {
    production: {
      user: 'admin_web',
      host: ['192.168.0.35'],
      ref: 'origin/master',
      repo: 'git@github.com:AlexeyNixel/frontend-ssr.git',
      path: "/home/admin_web/infomania-front",
      'post-deploy' : 'npm i && npm run build && pm2 startOrRestart ecosystem.config.cjs'
    }
  }
}