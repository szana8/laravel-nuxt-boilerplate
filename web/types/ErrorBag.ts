export type ErrorBag = {
    [key: string]: any
}

export type ValidationError = {
    data: {
        errors: ErrorBag
    }
}

export type RegisterValidationErrors = {
    name: string
    email: string
    password: string
    password_confirmation: string
    terms: string
}
