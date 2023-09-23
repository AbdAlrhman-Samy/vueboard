<script lang="ts" setup>
const props = defineProps<{
  error: any
}>()
</script>

<template>
  <div v-if="error" class="flex h-full animate-pulse items-center justify-center">
    <h1 class="text-2xl font-semibold text-red-500">Error</h1>
    <pre>
        {{ error }}
      </pre
    >
  </div>
</template>
