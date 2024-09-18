// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: false,
    },
    nitro: {
        experimental: {
            websocket: true,
        },
    },
    runtimeConfig: {
        baseUrl: process.env.BACKEND_URL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        public: {
            websocketURL: process.env.WEBSOCKET_URL,
            port: process.env.WEBSOCKET_PORT,
            key: process.env.WEBSOCKET_KEY,
        },
    },
    css: ['~/assets/css/main.css'],
    modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-utils', '@nuxt/fonts'],
    typescript: {
        shim: false,
        tsConfig: {
            include: ['~/types/*.ts'],
        },
    },
    fonts: {
        families: [
            {
                name: 'Figtree',
                src: 'https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap',
            },
        ],
    },
    plugins: ['~/plugins/customFetch.ts', '~/plugins/websocketClient.ts'],
})
