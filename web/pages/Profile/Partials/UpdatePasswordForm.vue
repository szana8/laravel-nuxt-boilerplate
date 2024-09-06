<script setup>
import { ref } from 'vue'

const passwordInput = ref(null)
const currentPasswordInput = ref(null)

const form = ref({
    current_password: '',
    password: '',
    password_confirmation: '',
})

const updatePassword = () => {
    // form.put(route('user-password.update'), {
    //     errorBag: 'updatePassword',
    //     preserveScroll: true,
    //     onSuccess: () => form.reset(),
    //     onError: () => {
    //         if (form.errors.password) {
    //             form.reset('password', 'password_confirmation');
    //             passwordInput.value.focus();
    //         }
    //
    //         if (form.errors.current_password) {
    //             form.reset('current_password');
    //             currentPasswordInput.value.focus();
    //         }
    //     },
    // });
}
</script>

<template>
    <FormSection @submitted="updatePassword">
        <template #title> Update Password </template>

        <template #description> Ensure your account is using a long, random password to stay secure. </template>

        <template #form>
            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="current_password" value="Current Password" />
                <TextInput id="current_password" ref="currentPasswordInput" v-model="form.current_password" type="password" class="mt-1 block w-full" autocomplete="current-password" />
                <InputError :message="'Current password error message'" class="mt-2" />
            </div>

            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="password" value="New Password" />
                <TextInput id="password" ref="passwordInput" v-model="form.password" type="password" class="mt-1 block w-full" autocomplete="new-password" />
                <InputError :message="'Password error message'" class="mt-2" />
            </div>

            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="password_confirmation" value="Confirm Password" />
                <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password" class="mt-1 block w-full" autocomplete="new-password" />
                <InputError :message="'Confirm password error message'" class="mt-2" />
            </div>
        </template>

        <template #actions>
            <ActionMessage :on="true" class="me-3"> Saved. </ActionMessage>

            <PrimaryButton :class="{ 'opacity-25': false }" :disabled="false"> Save </PrimaryButton>
        </template>
    </FormSection>
</template>
