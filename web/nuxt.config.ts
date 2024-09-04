// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: false,
    },
    runtimeConfig: {
        baseUrl: process.env.BACKEND_URL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    },
    devServer: {
        https: {
            key: './server.key',
            cert: './server.crt',
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
