import type { LaravelValidationErrors } from '~/types/ErrorBag'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const session = await getUserSession(event)

    let status: number = 200
    let data: any = null
    let error: any = null

    console.log('Here is the log')

    await $fetch('/user/confirmed-two-factor-authentication', {
        baseURL: process.env.BACKEND_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${session.token}`,
        },
        body: body,
    })
        .then(async (response: any) => {
            data = response
            status = response.status
        })
        .catch((errs) => {
            status = errs.status
            if (errs.status === 422) {
                error = errs.data.errors as LaravelValidationErrors
            } else {
                error = errs.data.message
            }

            console.log(error)
        })

    return { data, error, status }
})
