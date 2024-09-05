<script setup lang="ts">
const username = ref('')
const password = ref('')
const status = ref('')
const errorMessage = ref('')
const canResetPassword = ref(true)
const { fetch } = useUserSession()
useHead({
    title: 'Login',
    meta: [
        {
            name: 'description',
            content: 'Login to your account',
        },
    ],
})

definePageMeta({
    middleware: ['auth'],
})

const login = async () => {
    console.log(username.value)
    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                username: username.value,
                password: password.value,
            },
        }).then(() => {
            fetch().then(() => {
                navigateTo('/dashboard')
            })
        })
    } catch (error: any) {
        errorMessage.value = error.statusMessage
    }
}
</script>

<template>
    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
            {{ status }}
        </div>

        <form @submit.prevent="login">
            <div>
                <InputLabel for="username" value="Username" />
                <TextInput id="username" type="text" name="username" v-model="username" class="mt-1 block w-full" required autofocus autocomplete="username" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />
                <TextInput id="password" type="password" name="password" v-model="password" class="mt-1 block w-full" required autocomplete="current-password" />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <Checkbox name="remember" />
                    <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                <NuxtLink
                    v-if="canResetPassword"
                    href="/"
                    class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                    Forgot your password?
                </NuxtLink>

                <PrimaryButton class="ms-4" :class="{ 'opacity-25': false }" :disabled="false"> Log in </PrimaryButton>
            </div>
        </form>
    </AuthenticationCard>
</template>
