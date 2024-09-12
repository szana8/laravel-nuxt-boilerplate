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

    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: 'xbrpxrdrglhzczsfdrnx',
        wsHost: 'workspace',
        wsPort: 8080,
        wssPort: 8080,
        forceTLS: false,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: '/broadcasting/auth',
    })
})
