export function useWebhookClient<T>() {
    return useNuxtApp().$webhookClient
}
