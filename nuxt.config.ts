export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@element-plus/nuxt',
        '@vueuse/nuxt',
        '@pinia/nuxt',
    ],

    //@ts-ignore
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        '/assets/main.css',
        'element-plus/theme-chalk/dark/css-vars.css',
    ]
})
