export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedIn } = useUserSession()
    console.debug('Middleware: auth', loggedIn.value)

    if (!loggedIn.value && to.name !== 'Auth-Login') {
        return navigateTo('/auth/login')
    }

    if (loggedIn.value && to.name === 'Auth-Login') {
        console.debug('Already logged in, redirecting to dashboard')
        return navigateTo('/dashboard')
    }
})
