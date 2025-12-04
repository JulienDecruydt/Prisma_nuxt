export default defineNuxtRouteMiddleware(async () => {
    const { loggedIn, session, clear } = useUserSession()

    if (!loggedIn.value || !session.value) {
        return navigateTo('/login')
    }

    // Check session expiration (10 minutes)
    const maxAge = 60 * 10 * 1000 // 10 minutes in ms
    const loggedInAt = new Date(session.value.loggedInAt as string).getTime()
    const now = Date.now()

    if (now - loggedInAt > maxAge) {
        await clear()
        return navigateTo('/login')
    }
})