<script setup lang="ts">
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue'
import UpdatePasswordForm from '~/pages/Profile/Partials/UpdatePasswordForm.vue'
import TwoFactorAuthenticationForm from '~/pages/Profile/Partials/TwoFactorAuthenticationForm.vue'
import LogoutOtherBrowserSessionsForm from '~/pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue'
import DeleteUserForm from '~/pages/Profile/Partials/DeleteUserForm.vue'

defineProps({
    confirmsTwoFactorAuthentication: Boolean,
    sessions: Array,
})

definePageMeta({
    middleware: ['auth'],
})

const canUpdateProfileInformation = ref(true)
const canUpdatePassword = ref(true)
const canManageTwoFactorAuthentication = ref(true)
const hasAccountDeletionFeatures = ref(true)

useHead({
    title: 'Profile',
    meta: [
        {
            name: 'profile',
            content: 'Profile',
        },
    ],
})

const { user } = useUserSession()
</script>

<template>
    <NuxtLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>
        </template>

        <div>
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div v-if="canUpdateProfileInformation">
                    <UpdateProfileInformationForm :user="user" />

                    <SectionBorder />
                </div>

                <div v-if="canUpdatePassword">
                    <UpdatePasswordForm class="mt-10 sm:mt-0" />

                    <SectionBorder />
                </div>

                <div v-if="canManageTwoFactorAuthentication">
                    <TwoFactorAuthenticationForm :requires-confirmation="confirmsTwoFactorAuthentication" class="mt-10 sm:mt-0" />

                    <SectionBorder />
                </div>

                <LogoutOtherBrowserSessionsForm :sessions="sessions" class="mt-10 sm:mt-0" />

                <template v-if="hasAccountDeletionFeatures">
                    <SectionBorder />

                    <DeleteUserForm class="mt-10 sm:mt-0" />
                </template>
            </div>
        </div>
    </NuxtLayout>
</template>
