import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig().public

    const options: any = {
        broadcaster: 'reverb',
        key: config.key,
        wsHost: config.websocketURL,
        wsPort: config.port,
        wssPort: config.port,
        forceTLS: true,
        enabledTransports: ['ws', 'wss'],
        cluster: 'mt1',
    }

    const $webhookClient: Echo = new Echo({
        ...options,
        client: new Pusher(options.key, options),
    })

    return {
        provide: {
            webhookClient: $webhookClient,
        },
    }
})
