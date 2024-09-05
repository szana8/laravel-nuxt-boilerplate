import type { LaravelValidationErrors } from '~/types/ErrorBag'

export default defineEventHandler(async event => {
    const { name, email, password, password_confirmation } = await readBody(event)

    let data = {}
    let status: number = 200
    let error: LaravelValidationErrors | null = {}

    await $fetch('/register', {
        baseURL: process.env.BACKEND_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
        }),
    })
        .then((response: any) => {
            status = response.status
            data = response.data
        })
        .catch((errs: any) => {
            status = errs.status
            if (errs.status === 422) {
                error = errs.data.errors as LaravelValidationErrors
            }
        })

    return { error, data, status }
})
