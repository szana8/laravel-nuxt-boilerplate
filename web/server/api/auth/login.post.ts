export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event)

    const data: any = await $fetch('/oauth/token', {
        baseURL: process.env.LARAVEL_BACKEND_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            grant_type: 'password',
            client_id: process.env.LARAVEL_CLIENT_ID,
            client_secret: process.env.LARAVEL_CLIENT_SECRET,
            username: username,
            password: password,
        }),
    });

    if (data.access_token) {
        console.log('Login successful')
        setCookie(event, 'token', data.access_token)
    }
})