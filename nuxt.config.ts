export default defineNuxtConfig({
  devtools: { enabled: true },
  //@ts-ignore
  app: {
    head: {
      title:"НОМБ",
    }
  },
  buildModules: [
    '@nuxtjs/moment', ['ru'],
  ],
  modules: [
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@/modules/moment-reset',
    'dayjs-nuxt',
    'nuxt-swiper',
    ['@nuxtjs/google-fonts', {
      families: {
        Montserrat: true,
        Inter: [400],
        Raleway: {
          wght: [100, 700],
          ital: [100]
        },
      }
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
    'v-calendar/style.css'
  ],
});
