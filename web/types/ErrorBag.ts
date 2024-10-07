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

export type BackendErrors = {
    [key: number]: any
}

export type BackendResponse = { error: LaravelValidationErrors | string | null; data: any; status: number; pending: boolean }
