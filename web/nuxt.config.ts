// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: false
    },
    runtimeConfig: {
        public: {
            baseUrl: process.env.LARAVEL_BACKEND_URL,
        },
        baseUrl: process.env.LARAVEL_BACKEND_URL,
        clientId: process.env.LARAVEL_CLIENT_ID,
        clientSecret: process.env.LARAVEL_CLIENT_SECRET,
    },
    css: ['~/assets/css/main.css'],
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", 'nuxt-auth-utils'],
    typescript: {
        shim: false,
        tsConfig: {
            include: ['~/types/*.ts'],
        },
    },
})