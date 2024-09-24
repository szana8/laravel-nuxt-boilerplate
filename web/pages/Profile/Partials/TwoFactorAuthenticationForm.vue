<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    requiresConfirmation: Boolean,
})

const enabling = ref(false)
const confirming = ref(false)
const disabling = ref(false)
const qrCode = ref(null)
const setupKey = ref(null)
const recoveryCodes = ref([])

const confirmationForm = ref({
    code: '',
})

const twoFactorEnabled = ref(false)

watch(twoFactorEnabled, () => {
    if (!twoFactorEnabled.value) {
        confirmationForm.reset()
        confirmationForm.clearErrors()
    }
})

const enableTwoFactorAuthentication = async () => {
    enabling.value = true

    const { data } = await useFetch('api/user/two-factor-authentication', {
        method: 'POST',
        body: {
            requires_confirmation: false,
        },
    }).then(() => {
        Promise.all([showQrCode()])
    })

    // router.post(route('two-factor.enable'), {}, {
    //     preserveScroll: true,
    //     onSuccess: () => Promise.all([
    //         showQrCode(),
    //         showSetupKey(),
    //         showRecoveryCodes(),
    //     ]),
    //     onFinish: () => {
    //         enabling.value = false;
    //         confirming.value = props.requiresConfirmation;
    //     },
    // });
}

const showQrCode = () => {
    const { code } = useFetch('api/user/two-factor-qr-code', {
        method: 'POST',
    }).then((response) => {
        qrCode.value = response.data.value.code
        enabling.value = false
        confirming.value = props.requiresConfirmation
        twoFactorEnabled.value = true
    })
    //console.log(code)
    // qrCode.value = code
    // enabling.value = false
    // confirming.value = props.requiresConfirmation
    // twoFactorEnabled.value = true
}

const showSetupKey = () => {
    // return useFetch('api/user/two-factor-qr-code', {
    //     method: 'POST',
    // }).then(async (response) => {
    //     qrCode.value = response.data.svg
    //     enabling.value = false
    //     confirming.value = props.requiresConfirmation
    //     twoFactorEnabled.value = true
    // })
}

const showRecoveryCodes = () => {
    // return axios.get(route('two-factor.recovery-codes')).then(response => {
    //     recoveryCodes.value = response.data;
    // });
}

const confirmTwoFactorAuthentication = () => {
    // confirmationForm.post(route('two-factor.confirm'), {
    //     errorBag: "confirmTwoFactorAuthentication",
    //     preserveScroll: true,
    //     preserveState: true,
    //     onSuccess: () => {
    //         confirming.value = false;
    //         qrCode.value = null;
    //         setupKey.value = null;
    //     },
    // });
}

const regenerateRecoveryCodes = () => {
    // axios
    //     .post(route('two-factor.recovery-codes'))
    //     .then(() => showRecoveryCodes());
}

const disableTwoFactorAuthentication = () => {
    disabling.value = true

    // router.delete(route('two-factor.disable'), {
    //     preserveScroll: true,
    //     onSuccess: () => {
    //         disabling.value = false;
    //         confirming.value = false;
    //     },
    // });
}
</script>

<template>
    <ActionSection>
        <template #title> Two Factor Authentication </template>

        <template #description> Add additional security to your account using two factor authentication. </template>

        <template #content>
            <h3 v-if="twoFactorEnabled && !confirming" class="text-lg font-medium text-gray-900 dark:text-gray-100">You have enabled two factor authentication.</h3>

            <h3 v-else-if="twoFactorEnabled && confirming" class="text-lg font-medium text-gray-900 dark:text-gray-100">Finish enabling two factor authentication.</h3>

            <h3 v-else class="text-lg font-medium text-gray-900 dark:text-gray-100">You have not enabled two factor authentication.</h3>

            <div class="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                <p>
                    When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator
                    application.
                </p>
            </div>

            <div>
                <div>
                    <div class="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                        <p v-if="confirming" class="font-semibold">
                            To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP
                            code.
                        </p>

                        <p v-else>Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application or enter the setup key.</p>
                    </div>

                    <div class="mt-4 p-2 inline-block bg-white" v-html="qrCode" />

                    <div v-if="setupKey" class="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                        <p class="font-semibold">Setup Key: <span v-html="setupKey"></span></p>
                    </div>

                    <div v-if="confirming" class="mt-4">
                        <InputLabel for="code" value="Code" />

                        <TextInput
                            id="code"
                            v-model="confirmationForm.code"
                            type="text"
                            name="code"
                            class="block mt-1 w-1/2"
                            inputmode="numeric"
                            autofocus
                            autocomplete="one-time-code"
                            @keyup.enter="confirmTwoFactorAuthentication"
                        />

                        <InputError :message="confirmationForm.errors.code" class="mt-2" />
                    </div>
                </div>

                <div v-if="recoveryCodes.length > 0 && !confirming">
                    <div class="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                        <p class="font-semibold">
                            Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost.
                        </p>
                    </div>

                    <div class="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 dark:bg-gray-900 dark:text-gray-100 rounded-lg">
                        <div v-for="code in recoveryCodes" :key="code">
                            {{ code }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-5">
                <div v-if="!twoFactorEnabled">
                    <ConfirmsPassword @confirmed="enableTwoFactorAuthentication">
                        <PrimaryButton type="button" :class="{ 'opacity-25': enabling }" :disabled="enabling" @click="enableTwoFactorAuthentication"> Enable </PrimaryButton>
                    </ConfirmsPassword>
                </div>

                <div v-else>
                    <ConfirmsPassword @confirmed="confirmTwoFactorAuthentication">
                        <PrimaryButton v-if="confirming" type="button" class="me-3" :class="{ 'opacity-25': enabling }" :disabled="enabling"> Confirm </PrimaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="regenerateRecoveryCodes">
                        <SecondaryButton v-if="recoveryCodes.length > 0 && !confirming" class="me-3"> Regenerate Recovery Codes </SecondaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="showRecoveryCodes">
                        <SecondaryButton v-if="recoveryCodes.length === 0 && !confirming" class="me-3"> Show Recovery Codes </SecondaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
                        <SecondaryButton v-if="confirming" :class="{ 'opacity-25': disabling }" :disabled="disabling"> Cancel </SecondaryButton>
                    </ConfirmsPassword>

                    <ConfirmsPassword @confirmed="disableTwoFactorAuthentication">
                        <DangerButton v-if="!confirming" :class="{ 'opacity-25': disabling }" :disabled="disabling"> Disable </DangerButton>
                    </ConfirmsPassword>
                </div>
            </div>
        </template>
    </ActionSection>
</template>
