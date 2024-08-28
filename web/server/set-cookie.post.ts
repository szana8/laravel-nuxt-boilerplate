export default defineEventHandler(async (event) => {
    const { token } = await readBody(event)

    await setUserSession(event, {
        user: {
            token: token
        }
    });

    return {message: "Cookie set successfully"}
})