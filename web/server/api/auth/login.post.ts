import customFetch from '~/plugins/customFetch'

export default defineEventHandler(async event => {
    const { username, password } = await readBody(event)

    const data: any = await $fetch('/oauth/token', {
        baseURL: process.env.LARAVEL_BACKEND_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            grant_type: 'password',
            client_id: process.env.LARAVEL_CLIENT_ID,
            client_secret: process.env.LARAVEL_CLIENT_SECRET,
            username: username,
            password: password,
            scope: '',
        }),
        onResponse({ response }) {
            if (response.status !== 200) {
                throw createError({
                    statusCode: response.status,
                    statusMessage: 'Invalid credentials',
                })
            }
        },
    })

    if (data.access_token) {
        setCookie(event, 'token', data.access_token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            secure: true,
            sameSite: 'lax',
        })

        await setUserSession(event, {
            user: {
                name: 'John Doe',
            },
        })

        return Promise.resolve()
    }

    console.error('Error logging in', data)
})
