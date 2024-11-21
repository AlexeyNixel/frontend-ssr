import { getIconCollections } from '@egoist/tailwindcss-icons';

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
  ],

  dayjs: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },

  css: [
    // '/app/styles/ckeditor.css',
    // '/app/styles/ckeditorImage.css',
    '/app/styles/gosWidget.css',
    'viewerjs/dist/viewer.css',
    'ckeditor5/ckeditor5.css',
  ],

  tailwindcss: {
    cssPath: '@/assets/styles/main.css',
  },

  ui: {
    icons: {
      collections: {
        ...getIconCollections(['mdi', 'heroicons']),
      },
    },
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
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
});
