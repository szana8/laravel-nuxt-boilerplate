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

    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: 'xbrpxrdrglhzczsfdrnx',
        wsHost: 'workspace',
        wssHost: 'workspace',
        wsPort: 8080,
        wssPort: 8080,
        forceTLS: false,
        enabledTransports: ['ws'],
        authEndpoint: 'api/broadcasting/auth',
        auth: {
            headers: {
                Authorization: 'Bearer ' + session.value.token,
            },
        },
    })
})
