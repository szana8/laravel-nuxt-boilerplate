export default defineEventHandler(async event => {
    const { username, password } = await readBody(event)

    const data: any = await $fetch('/oauth/token', {
        baseURL: process.env.BACKEND_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            grant_type: 'password',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            username: username,
            password: password,
            scope: '',
        }),
        onResponse({ response }) {
            console.log(response.body)
            if (response.status !== 200) {
                throw createError({
                    statusCode: response.status,
                    statusMessage: 'Invalid credentials',
                })
            }
        },
    })

    if (data.access_token) {
        const { user } = await setUserSession(event, {
            user: {
                name: username,
            },
            token: data.access_token,
        })

        return Promise.resolve()
    }
})
