<template>
  <RouterLink 
    :to="to" 
    class="flex flex-row ps-8 items-center gap-4 w-full py-4 hover:text-main"
    :class="{
      'bg-white text-main rounded-s-2xl font-semibold': $route.path === to,
      'text-secondary-soft': $route.path !== to
    }"
  >
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

</script>

<style scoped>

</style>