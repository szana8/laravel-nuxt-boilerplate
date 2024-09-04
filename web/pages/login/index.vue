<template>
    <div>
        <LoginForm />
    </div>
</template>

<script setup lang="ts">
import LoginForm from '~/pages/login/components/LoginForm.vue'

definePageMeta({
    middleware: ['auth'],
})
</script>
