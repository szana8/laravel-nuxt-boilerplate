<script setup lang="ts">

import Navigation from "~/components/Navigation.vue";
</script>

<template>
  <div class="bg-white">
    <div class="flex">
      <div class="container mx-auto flex">
        <div class="sticky top-0 z-40 flex max-h-screen w-1/5">
          <Navigation />
        </div>
        <div class="w-4/5">
          <div class="sticky top-0 z-10 flex h-16 w-full items-center border-b border-white bg-white">

          </div>
          <div class="z-1 w-full overflow-scroll bg-white">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>