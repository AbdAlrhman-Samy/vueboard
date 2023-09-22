<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

const computedClasses = computed(() => {
  return {
    'bg-orders': props.title === 'orders',
    'bg-profit': props.title === 'profit',
    'rounded-tl-3xl rounded-br-3xl rounded-bl rounded-tr': props.title === 'orders',
    'rounded-bl-3xl rounded-tr-3xl rounded-tl rounded-br': props.title === 'profit'
  }
})
</script>

<template>
  <div
    class="flex transform flex-row items-center gap-4 px-8 py-6 transition-all duration-200 ease-in-out hover:scale-105"
    :class="computedClasses"
  >
    <slot></slot>

    <hgroup class="text-main">
      <h4 class="text-xl font-bold">
        {{ props.value }}
      </h4>
      <p class="text-xs font-medium">
        {{ props.title.toUpperCase() }}
      </p>
    </hgroup>

    <span
      class="rounded-bl-lg rounded-br rounded-tl rounded-tr-lg bg-main p-1 text-xs font-bold text-white"
    >
      {{ props.title === 'orders' ? '+20' : '+$623' }}
    </span>
  </div>
</template>

<style scoped></style>
