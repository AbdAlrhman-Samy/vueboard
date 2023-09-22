<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>

<template>
  <RouterLink
    :to="to"
    class="flex w-full flex-row items-center gap-4 py-4 ps-8 hover:text-main"
    :class="{
      'rounded-s-2xl bg-white font-semibold text-main': $route.path === to,
      'text-secondary-soft': $route.path !== to
    }"
  >
    <slot />
  </RouterLink>
</template>

<style scoped></style>
