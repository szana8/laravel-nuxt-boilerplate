import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
    interface Window {
        Pusher: any
        Echo: any
    }
}

export default defineNuxtPlugin(() => {
    /*window.Pusher = Pusher

    const { session } = useUserSession()

    const $webhookClient: Echo = new Echo({
        broadcaster: 'reverb',
        key: 'tdt0ynwuwmxb0unsuq8j',
        wssHost: 'workspace',
        wssPort: 8080,
        forceTLS: false,
        encrypted: false,
        enabledTransports: ['wss'],
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
    }*/
})
