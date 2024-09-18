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
            console.log('Token: ', response.access_token)
            await $fetch('/api/user', {
                baseURL: process.env.BACKEND_URL,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${response.access_token}`,
                },
            })
                .then(async (userResponse: any) => {
                    status = 200
                    await setUserSession(event, {
                        user: {
                            id: userResponse.id,
                            name: userResponse.name,
                            email: userResponse.email,
                            two_factor_confirmed_at: userResponse.two_factor_confirmed_at,
                            email_verified_at: userResponse.email_verified_at,
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
