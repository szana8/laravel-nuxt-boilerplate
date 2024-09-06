<script setup lang="ts">
import type { BackendErrors, NuxtFormErrors } from '~/types/ErrorBag'

const name = ref('')
const email = ref('')
const password = ref('')
const terms = ref(false)
const password_confirmation = ref('')
const backEndError = ref(<BackendErrors>{})
const hasBackendError = ref(false)
const hasTermsAndPrivacyPolicyFeature = ref(false)

let errors = ref(<NuxtFormErrors>{})
const processing = ref(false)

const clearErrors = () => {
    errors.value = ref(<NuxtFormErrors>{}).value
    backEndError.value = ''
    hasBackendError.value = false
}

const submit = async () => {
    clearErrors()
    processing.value = true

    const { error, status } = await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
            name: name.value,
            password: password.value,
            email: email.value,
            password_confirmation: password_confirmation.value,
        },
    })

    processing.value = false
    if (error && status === 422) {
        for (const [key, value] of Object.entries(error)) {
            errors.value[key] = value[0]
        }
    }

    if (error && status !== 422) {
        hasBackendError.value = true
        backEndError.value = error
    }
}
</script>

<template>
    <NuxtLayout :name="'empty'">
        <AuthenticationCard>
            <template #logo>
                <AuthenticationCardLogo />
            </template>

            <ActionMessage v-if="backEndError" :on="hasBackendError" class="bg-red-300 text-red-800 rounded px-3 py-4 mb-4">{{ backEndError }}</ActionMessage>

            <form @submit.prevent="submit">
                <div>
                    <InputLabel for="name" value="Name" />
                    <TextInput id="name" v-model="name" type="text" class="mt-1 block w-full" autofocus autocomplete="name" />
                    <InputError class="mt-2" :message="errors.name" />
                </div>

                <div class="mt-4">
                    <InputLabel for="email" value="Email" />
                    <TextInput id="email" v-model="email" type="email" class="mt-1 block w-full" autocomplete="username" />
                    <InputError class="mt-2" :message="errors.email" />
                </div>

                <div class="mt-4">
                    <InputLabel for="password" value="Password" />
                    <TextInput id="password" v-model="password" type="password" class="mt-1 block w-full" autocomplete="new-password" />
                    <InputError class="mt-2" :message="errors.password" />
                </div>

                <div class="mt-4">
                    <InputLabel for="password_confirmation" value="Confirm Password" />
                    <TextInput id="password_confirmation" v-model="password_confirmation" type="password" class="mt-1 block w-full" autocomplete="new-password" />
                    <InputError class="mt-2" :message="errors.password_confirmation" />
                </div>

                <div v-if="hasTermsAndPrivacyPolicyFeature" class="mt-4">
                    <InputLabel for="terms">
                        <div class="flex items-center">
                            <Checkbox id="terms" v-model:checked="terms" name="terms" />

                            <div class="ms-2">
                                I agree to the
                                <a
                                    target="_blank"
                                    :href="'/'"
                                    class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >Terms of Service</a
                                >
                                and
                                <a
                                    target="_blank"
                                    :href="'/'"
                                    class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >Privacy Policy</a
                                >
                            </div>
                        </div>
                        <InputError class="mt-2" :message="errors.terms" />
                    </InputLabel>
                </div>

                <div class="flex items-center justify-end mt-4">
                    <Link
                        :href="'/'"
                        class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton class="ms-4" :class="{ 'opacity-25': processing }" :disabled="processing"> Register </PrimaryButton>
                </div>
            </form>
        </AuthenticationCard>
    </NuxtLayout>
</template>
