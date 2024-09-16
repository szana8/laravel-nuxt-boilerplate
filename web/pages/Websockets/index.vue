<script setup lang="ts">
import { useWebhookClient } from '~/composables/useWebhookClient'
import type Echo from 'laravel-echo'

definePageMeta({
    middleware: ['auth'],
})

useHead({
    title: 'Dashboard',
    meta: [
        {
            name: 'description',
            content: 'Dashboard content',
        },
    ],
})
const client: Echo = useWebhookClient()

const l = client.listen('chat.1', '.testing', (e: any) => {
    console.log('Event', e)
})
</script>

<template>
    <NuxtLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Websockets</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg"></div>
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped></style>
