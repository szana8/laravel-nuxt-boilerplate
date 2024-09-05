export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedIn } = useUserSession()
    console.log('Middleware: auth', loggedIn.value)

    if (!loggedIn.value && to.name !== 'login') {
        return navigateTo('/auth/login')
    }

    if (loggedIn.value && to.name === 'login') {
        console.log('Already logged in, redirecting to dashboard')
        return navigateTo('/dashboard')
    }
})
