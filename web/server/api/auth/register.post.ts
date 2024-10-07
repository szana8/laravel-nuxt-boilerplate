import type { LaravelValidationErrors, BackendResponse } from '~/types/ErrorBag'

export default defineEventHandler(async (event) => {
    const { name, email, password, password_confirmation } = await readBody(event)

    let data = {}
    let status: number = 200
    let pending = true
    let error: LaravelValidationErrors | string | null = {}

    await $fetch('api/register', {
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
        .then(async (response: any) => {
            pending = false
            status = response.status
            data = response.data
        })
        .catch(async (errs: any) => {
            status = errs.status
            pending = false
            console.log(errs)
            if (errs.status === 422) {
                error = errs.data.errors as LaravelValidationErrors
            } else {
                error = 'Something went wrong'
                status = 500
            }
        })

    return { error, data, status, pending }
})
