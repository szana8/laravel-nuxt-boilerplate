import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
    interface Window {
        Pusher: any
        Echo: any
    }
}

export default defineNuxtPlugin(() => {
    window.Pusher = Pusher

    const { session } = useUserSession()

    console.log('session.value.token', session.value.token)

    const $webhookClient: Echo = new Echo({
        broadcaster: 'reverb',
        key: 'tdt0ynwuwmxb0unsuq8j',
        wsHost: 'localhost',
        wsPort: 8090,
        wssPort: 8090,
        forceTLS: true,
        enabledTransports: ['ws', 'wss'],
        // authEndpoint: 'http://workspace/api/broadcasting/auth',
        // auth: {
        //     headers: {
        //         Authorization: 'Bearer ' + session.value.token,
        //     },
        // },
    })

    return {
        provide: {
            webhookClient: $webhookClient,
        },
    }
})
