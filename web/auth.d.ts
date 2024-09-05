// auth.d.ts
declare module '#auth-utils' {
    interface User {
        name: ?string
        email: ?string
        two_factor_confirmed_at: ?string
    }

    interface UserSession {
        user?: User
        token: ?string
    }
}

export {}
