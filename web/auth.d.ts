// auth.d.ts
declare module '#auth-utils' {
    interface User {
        id: number
        name: ?string
        email: ?string
        two_factor_enabled: boolean
        two_factor_confirmed_at: ?string
        email_verified_at: ?string
        profile_photo_url: ?string
        profile_photo_path: ?string
    }

    interface UserSession {
        user?: User
        token: ?string
    }
}

export {}
