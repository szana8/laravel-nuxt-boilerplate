export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const session = await getUserSession(event)

    const qrCode = null
    const setupKey = null
    const recoveryCodes = null

    await $fetch('/user/two-factor-authentication', {
        baseURL: process.env.BACKEND_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${session.token}`,
        },
        body: body,
    }).then(async (response: any) => {
        console.log(response)
    })
})
