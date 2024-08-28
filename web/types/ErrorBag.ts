export type ErrorBag = {
    [key: string]: any
}

export type ValidationError = {
    data: {
        errors: ErrorBag
    }
}