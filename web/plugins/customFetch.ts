export default defineNuxtPlugin(() => {
    const userAuth = useCookie('token')
    //const config = useRuntimeConfig()

    const $customFetch = $fetch.create({
        baseURL: process.env.LARAVEL_BACKEND_URL,
        method: 'GET',
        onRequest({ request, options, error }) {
            options.headers = options.headers as { [key: string]: string } || {}
            options.headers.accept = 'application/json'
            if (userAuth.value) {
                // Add Authorization header
                options.headers.Authorization = `Bearer ${userAuth.value}`
            }
        },
        onResponse ({ response }) {
            console.log('Response')
        },
        onResponseError({ request, response, options }) {
            if (response.status === 401) {
                return navigateTo('/login')
            }
            console.log('Response Error', response)
        },
    })
    // Expose to useNuxtApp().$customFetch
    return {
        provide: {
            customFetch: $customFetch
        }
    }
})