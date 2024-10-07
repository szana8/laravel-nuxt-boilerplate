export default defineEventHandler(async (event) => {
    deleteCookie(event, 'token')

    return {message: "Logged out successfully"}
})