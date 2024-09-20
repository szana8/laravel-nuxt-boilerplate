import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig().public.websocket

    const { session } = useUserSession()

    const options: any = {
        broadcaster: 'reverb',
        key: config.key,
        wsHost: config.url,
        wsPort: config.port,
        wssPort: config.port,
        forceTLS: true,
        enabledTransports: ['ws', 'wss'],
        cluster: 'mt1',
        auth: {
            headers: {
                Authorization: `Bearer ${session.value.token}`,
            },
        },
        authEndpoint: `https://${config.url}/api/broadcasting/auth`,
    }

    const $websocketClient: Echo = new Echo({
        ...options,
        client: new Pusher(options.key, options),
    })

    return {
        provide: {
            websocketClient: $websocketClient,
        },
    }
})
