export default defineNuxtConfig({
  devtools: { enabled: true },
  //@ts-ignore
  app: {
    head: {
      title:"НОМБ",
    }
  },
  //@ts-ignore
  buildModules: [
    '@nuxtjs/moment', ['ru'],
  ],
  modules: [
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@/modules/moment-reset',
    'dayjs-nuxt'
  ],

  dayjs: {
    locales:['ru'],
    defaultLocale: 'ru',
  },

  vite: {
    server: {
      proxy: {
        '/site': {
          target: 'http://static.infomania.ru/',
          changeOrigin: true,
        },
        '/media': {
          target: 'http://static.infomania.ru/site',
          changeOrigin: true,
        },
        '/news': {
          target: 'http://dev.infomania.ru/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/entry/, ''),
        },
      },
    }
  },

  //@ts-ignore
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '/assets/main.css',
    '/assets/ckStyle.css',
    '/assets/imageResize.css',
    '/assets/gosUslugi.css',
    'element-plus/theme-chalk/dark/css-vars.css',

  ],
});
