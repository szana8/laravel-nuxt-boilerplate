// auth.d.ts
import type { User } from '#auth-utils'

declare module '#auth-utils' {
    interface UserSession {
        user?: User
        token: ?string
    }
}

export {}
