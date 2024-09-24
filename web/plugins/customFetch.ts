export default defineNuxtPlugin(() => {
    const { session } = useUserSession()

    const baseUrl: string = useRuntimeConfig().public.BACKEND_URL as string

    const $customFetch = $fetch.create({
        baseURL: baseUrl,
        onRequest({ request, options, error }) {
            // Add default headers
            options.headers = (options.headers as { [key: string]: string }) || {}
            options.headers['Accept'] = 'application/json'
            options.headers['Content-Type'] = 'application/json'

            if (session.value.token) {
                // Add Authorization header
                options.headers.Authorization = `Bearer ${session.value.token}`
            }
        },
        onResponse({ response }) {
            // ... handle response
            console.log('Response', response)
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
