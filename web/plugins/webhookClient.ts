import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
    interface Window {
        Pusher: any
    }
}

export default defineNuxtPlugin(() => {
    window.Pusher = Pusher

    const config = useRuntimeConfig().public

    const $webhookClient: Echo = new Echo({
        broadcaster: 'reverb',
        key: config.key,
        wsHost: config.websocketURL,
        wsPort: config.port,
        wssPort: config.port,
        forceTLS: true,
        enabledTransports: ['ws', 'wss'],
    })

    return {
        provide: {
            webhookClient: $webhookClient,
        },
    }
})
