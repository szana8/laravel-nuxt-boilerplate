export default defineNuxtPlugin(() => {
    const userAuth = useCookie('token')
    //const config = useRuntimeConfig()

    const $customFetch = $fetch.create({
        baseURL: process.env.LARAVEL_BACKEND_URL,
        onRequest({ request, options, error }) {
            options.headers = options.headers || {}
            options.headers.accept = 'application/json'
            if (userAuth.value) {
                // Add Authorization header
                options.headers.Authorization = `Bearer ${userAuth.value}`
            }
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                return navigateTo('/login')
            }
            console.log('Response Error', response)
        },
        onResponse ({ response }) {
            console.log('Response')
            // response._data = new myBusinessResponse(response._data)
        },
    })
    // Expose to useNuxtApp().$customFetch
    return {
        provide: {
            customFetch: $customFetch
        }
    }
})