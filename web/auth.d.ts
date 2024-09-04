// auth.d.ts
declare module '#auth-utils' {
    interface User {
        name: ?string
    }

    interface UserSession {
        user?: User
        token: ?string
    }
}

export {}
