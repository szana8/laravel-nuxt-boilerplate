export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)
    let data: any = null
    let error: any = null

    await $fetch('/user/two-factor-recovery-codes', {
        baseURL: process.env.BACKEND_URL,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${session.token}`,
        },
    })
        .then(async (response: any) => {
            data = response
        })
        .catch((e) => {
            error = e
        })

    return { data, error }
})
