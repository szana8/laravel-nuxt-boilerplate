// server/plugins/session.ts
export default defineNitroPlugin(() => {
    // Called when we call useServerSession().clear() or clearUserSession(event)
    sessionHooks.hook('clear', async (session, event) => {
        deleteCookie(event, 'token')
    })
})
