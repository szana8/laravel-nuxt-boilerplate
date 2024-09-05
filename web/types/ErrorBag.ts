export type ErrorBag = {
    [key: string]: any
}

export type ValidationError = {
    data: {
        errors: ErrorBag
    }
}

export type LaravelValidationErrors = {
    [key: string]: string[]
}

export type NuxtFormErrors = {
    [key: string]: string
}
