export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const session = await getUserSession(event)

    let code: any = null

    await $fetch('/user/two-factor-qr-code', {
        baseURL: process.env.BACKEND_URL,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${session.token}`,
        },
    }).then(async (response: any) => {
        //console.log('QR: ', response)

        code = response.svg
    })

    return { code }
})
