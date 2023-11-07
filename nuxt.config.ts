export default defineNuxtConfig({
  devtools: { enabled: true },
  //@ts-ignore
  app: {
    head: {
      title: 'НОМБ',
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-swiper',
    '@nuxtjs/device',
    'dayjs-nuxt',
    '@nuxt/ui',
    'nuxt-icon',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Montserrat: true,
          Inter: [400],
          Raleway: {
            wght: [100, 700],
            ital: [100],
          },
        },
      },
    ],
  ],

  dayjs: {
    locales: ['ru'],
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
          //@ts-ignore
          rewrite: (path) => path.replace(/^\/entry/, ''),
        },
      },
    },
  },

  //@ts-ignore
  css: [
    '/assets/main.css',
    '/assets/ckStyle.css',
    '/assets/imageResize.css',
    '/assets/gosUslugi.css',
    'viewerjs/dist/viewer.css',
  ],
});
