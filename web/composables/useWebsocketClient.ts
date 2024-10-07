export function useWebsocketClient<T>() {
    return useNuxtApp().$websocketClient
}
