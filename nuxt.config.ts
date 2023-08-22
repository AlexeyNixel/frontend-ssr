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
    '@/modules/moment-reset'
  ],
  //@ts-ignore
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '/assets/main.css',
    '/assets/ckStyle.css',
    '/assets/imageResize.css',
    'element-plus/theme-chalk/dark/css-vars.css',
  ],
});
