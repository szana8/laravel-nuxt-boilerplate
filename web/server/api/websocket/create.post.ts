export default defineEventHandler(async event => {
    const body = await readBody(event)

    const session = await getUserSession(event)
    console.log(session.token);
    await $fetch('/api/post', {
        baseURL: process.env.BACKEND_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${session.token}`,
        },
        body: body,
    })
})
