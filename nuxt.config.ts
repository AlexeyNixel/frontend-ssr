export default defineNuxtConfig({
  devtools: { enabled: true },

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
