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

    const $webhookClient: Echo = new Echo({
        broadcaster: 'reverb',
        key: 'tdt0ynwuwmxb0unsuq8j',
        wsHost: 'nuxt.laravel.test',
        wsPort: 443,
        //forceTLS: false,
        //useTLS: false,
        //encrypted: false,
        enabledTransports: ['ws'],
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
