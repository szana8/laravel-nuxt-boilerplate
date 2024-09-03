<template>
    <div>
        <h1 class="font-bold text-2xl text-center mt-6">Dashboard</h1>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})
</script>
