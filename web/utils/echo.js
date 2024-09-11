import Echo from 'laravel-echo'

import Pusher from 'pusher-js'
window.Pusher = Pusher

const echo = new Echo({
    broadcaster: 'reverb',
    key: process.env.REVERB_APP_KEY,
    authorizer: channel => {
        return {
            authorize: (socketId, callback) => {
                fetch('api/broadcasting/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${useUserSession().user('token')}`,
                    },
                    body: JSON.stringify({
                        socket_id: socketId,
                        channel_name: channel.name,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        callback(false, data)
                    })
                    .catch(error => {
                        callback(true, error)
                    })
            },
        }
    },
    wsHost: process.env.REVERB_HOST,
    wsPort: process.env.REVERB_PORT,
    wssPort: process.env.REVERB_PORT,
    forceTLS: (process.env.REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
})

export default echo
