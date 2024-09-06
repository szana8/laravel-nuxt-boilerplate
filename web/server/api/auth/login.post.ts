export default defineEventHandler(async event => {
    const { username, password } = await readBody(event)
    let status: number = 200
    let error: { [key: string]: string } = {}

    await $fetch('/oauth/token', {
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
    })
        .then(async (response: any) => {
            await $fetch('/api/user', {
                baseURL: process.env.BACKEND_URL,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${response.access_token}`,
                },
            })
                .then(async (response: any) => {
                    status = 200
                    await setUserSession(event, {
                        user: {
                            name: response.name,
                            email: response.email,
                            two_factor_confirmed_at: response.two_factor_confirmed_at,
                            email_verified_at: response.email_verified_at,
                            profile_photo_url: 'https://i.pravatar.cc/150?u=1',
                            profile_photo_path: '',
                        },
                        token: response.access_token,
                    })
                })
                .catch((err: any) => {
                    status = 500
                    error = {
                        message: 'Error fetching user data.',
                    }
                })
        })
        .catch(async (err: any) => {
            console.log(err)
            status = 500
            error = {
                message: 'The provided credentials are incorrect.',
            }
        })

    return { error, status }
})
