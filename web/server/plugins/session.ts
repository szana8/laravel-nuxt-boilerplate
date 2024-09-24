// server/plugins/session.ts
export default defineNitroPlugin(() => {
    // Called when we call useServerSession().clear() or clearUserSession(event)
    sessionHooks.hook('fetch', async (session, event) => {
        await $fetch('/api/user', {
            baseURL: process.env.BACKEND_URL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${session.token}`,
            },
        })
            .then(async (userResponse: any) => {
                await setUserSession(event, {
                    user: {
                        id: userResponse.id,
                        name: userResponse.name,
                        email: userResponse.email,
                        two_factor_confirmed_at: userResponse.two_factor_confirmed_at,
                        two_factor_enabled: userResponse.two_factor_enabled,
                        email_verified_at: userResponse.email_verified_at,
                        profile_photo_url: 'https://i.pravatar.cc/150?u=1',
                        profile_photo_path: '',
                    },
                    token: session.access_token,
                })
            })
            .catch((err: any) => {
                console.log(err)
            })
    })

    sessionHooks.hook('clear', async (session, event) => {
        deleteCookie(event, 'token')
    })
})
