<script setup lang="ts">
import type Echo from 'laravel-echo'
import { useUserSession } from '#imports'
import { useWebsocketClient } from '~/composables/useWebsocketClient'

definePageMeta({
    middleware: ['auth'],
})

useHead({
    title: 'Websockets',
    meta: [
        {
            name: 'description',
            content: 'Websockets content',
        },
    ],
})

const client: Echo = useWebsocketClient()
const { user } = useUserSession()
const message = ref('')
const info = ref(true)
const show = ref(false)
const posts = ref<any[]>([])

const send = () => {
    show.value = true
    $fetch('/api/websocket/create', {
        method: 'POST',
        body: {
            message: message.value,
        },
    })
        .then(() => {
            message.value = ''
            show.value = false
        })
        .catch((e) => {
            console.log('Error: ', e)
            show.value = false
        })
}

client.private(`chat.${user.value?.id}`).listen('.post.created', (e: any) => {
    posts.value.push(e.post)
})
</script>

<template>
    <NuxtLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Websockets</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">
                <div
                    id="alert-additional-content-1"
                    class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                    role="alert"
                    v-if="info"
                >
                    <div class="flex items-center">
                        <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                            />
                        </svg>
                        <span class="sr-only">Info</span>
                        <h3 class="text-lg font-medium">Websocket test!</h3>
                    </div>
                    <div class="mt-2 mb-4 text-sm">You can send messages to the backend and give back the response in real-time.</div>
                    <div class="flex">
                        <button
                            type="button"
                            @click="info = false"
                            class="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
                            data-dismiss-target="#alert-additional-content-1"
                            aria-label="Close"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-8">
                    <form @submit.prevent="send">
                        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label for="comment" class="sr-only">Your comment</label>
                            <textarea
                                id="comment"
                                rows="6"
                                name="message"
                                v-model="message"
                                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..."
                                required
                            ></textarea>
                        </div>

                        <div class="flex items-center justify-end mt-4">
                            <PrimaryButton
                                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                :class="{ 'opacity-25': false }"
                                :disabled="false"
                            >
                                Send
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                <div v-for="post in posts" class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg p-8">
                    <div class="flex items-center space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ post.user.name }}</span>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ post.created_at }}</span>
                    </div>
                    <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ post.message }}</p>
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                </div>

                <div class="">
                    <BottomNotification class="fixed bottom-4 inset-x-0 mx-auto" :show="show" v-if="show" />
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped></style>
