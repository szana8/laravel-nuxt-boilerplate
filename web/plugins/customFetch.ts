export default defineNuxtPlugin(() => {
    const userAuth = useCookie('token')

    const $customFetch = $fetch.create({
        baseURL: process.env.LARAVEL_BACKEND_URL,
        onRequest({ request, options, error }) {
            // Add default headers
            options.headers =
                (options.headers as { [key: string]: string }) || {}
            options.headers['Accept'] = 'application/json'
            options.headers['Content-Type'] = 'application/json'

            if (userAuth.value) {
                // Add Authorization header
                options.headers.Authorization = `Bearer ${userAuth.value}`
            }
        },
        onResponse({ response }) {
            // ... handle response
        },
        onResponseError({ response }) {
            // handle response error
            console.log('Response Error', response)
        },
    })

    return {
        provide: {
            customFetch: $customFetch,
        },
    }
})
