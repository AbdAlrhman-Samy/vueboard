<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  title: string
  variant?: 'secondary' | 'danger'
  full?: boolean
}>()

const classes = computed(() => {
  const base = `px-2 py-1 h-full rounded-tl-lg rounded-br-lg rounded-sm uppercase text-sm font-semibold w-fit transition-colors disabled:opacity-50 disabled:cursor-not-allowed`
  switch (props.variant) {
    case 'secondary':
      return `${base} text-secondary border-2 border-secondary hover:bg-secondary hover:text-light`
    case 'danger':
      return `${base} text-red-800 border-2 border-red-800 hover:bg-red-800 hover:text-light`
    default:
      return `${base} text-main border-2 border-main hover:bg-main hover:text-light`
  }
})
</script>

<template>
  <button :class="[classes, full ? 'w-full' : '']" v-bind="$attrs">
    {{ title }}
  </button>
</template>
