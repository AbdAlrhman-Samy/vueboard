<script setup lang="ts">
const props = defineProps<Props>()

const classes = {
  'bg-orders': props.title === 'orders',
  'bg-profit': props.title === 'profit',
  'rounded-tl-3xl rounded-br-3xl rounded-bl rounded-tr': props.title === 'orders',
  'rounded-bl-3xl rounded-tr-3xl rounded-tl rounded-br': props.title === 'profit'
}

interface Props {
  title: string
  value: string
}
</script>

<template>
  <div
    class="flex w-full transform flex-row items-center justify-between gap-4 px-8 py-6 transition-all duration-200 ease-in-out hover:scale-105"
    :class="classes"
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
