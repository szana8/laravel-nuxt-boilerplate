export default defineNuxtPlugin(() => {
    const { session } = useUserSession()

    const $customFetch = $fetch.create({
        baseURL: process.env.BACKEND_URL,
        onRequest({ request, options, error }) {
            // Add default headers
            options.headers =
                (options.headers as { [key: string]: string }) || {}
            options.headers['Accept'] = 'application/json'
            options.headers['Content-Type'] = 'application/json'

            if (session.value.token) {
                // Add Authorization header
                options.headers.Authorization = `Bearer ${session.value.token}`
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
