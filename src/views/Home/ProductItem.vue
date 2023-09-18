<script setup lang="ts">

const props = defineProps<Props>()

interface Props {
  rank: number
  name: string
  price: number | string
  image: string
}

</script>

<template>
  <li class="flex flex-row items-center gap-4 p-2 transition-all duration-200 ease-in-out rounded-tr rounded-bl hover:bg-main-soft hover:bg-opacity-10 rounded-tl-3xl rounded-br-3xl">
    <span class="p-1 text-xs font-bold text-gray-400">
      {{ props.rank }}
    </span>

    <img :src="props.image" :alt="props.name" class="rounded-tr rounded-bl w-14 h-14 rounded-tl-xl rounded-br-xl" />

    <hgroup>
      <h4 class="text-sm font-bold text-main">
        {{ props.name }}
      </h4>
      <p class="text-xs font-normal text-main">
        ${{ props.price }}
      </p>
    </hgroup>
  </li>
</template>

<style scoped>

</style>