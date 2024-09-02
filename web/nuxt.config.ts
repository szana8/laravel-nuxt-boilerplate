// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: false,
    },
    runtimeConfig: {
        public: {
            baseUrl: process.env.LARAVEL_BACKEND_URL,
        },
        baseUrl: process.env.LARAVEL_BACKEND_URL,
        clientId: process.env.LARAVEL_CLIENT_ID,
        clientSecret: process.env.LARAVEL_CLIENT_SECRET,
        session: {
            maxAge: 60 * 60 * 24 * 7, // 1 week
        },
    },
    css: ['~/assets/css/main.css'],
    modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-utils'],
    typescript: {
        shim: false,
        tsConfig: {
            include: ['~/types/*.ts'],
        },
    },
})
