<template>
    <div>
        <h1 class="font-bold text-2xl text-center mt-6">Dashboard</h1>
        <div>Logged in: {{ loggedIn }}</div>
        <div v-if="true">User: {{ user }}</div>
        <div v-if="loggedIn">Session: {{ session }}</div>
        <button v-if="loggedIn" @click="clear">Logout</button>
    </div>
</template>

<script setup lang="ts">
const { loggedIn, user, session, fetch, clear } = useUserSession()

//const data = await useCustomFetch<[]>('/api/user')
</script>
