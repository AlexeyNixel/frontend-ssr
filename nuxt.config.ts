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

  css: [
    '/assets/ckStyle.css',
    '/assets/imageResize.css',
    '/assets/gosUslugi.css',
    'viewerjs/dist/viewer.css',
  ],

  tailwindcss: {
    cssPath: '~/assets/main.css',
  },
});
