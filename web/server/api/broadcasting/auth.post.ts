export default defineEventHandler(async event => {
    const body = await readBody(event)

    console.log(body.value)

    const session = await getUserSession(event)
    await $fetch('/broadcasting/auth', {
        baseURL: process.env.BACKEND_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            //Authorization: `Bearer ${session.user?.token}`,
        },
        body: body,
    }).then(async (response: any) => {
        //console.log(response)
    })
})
