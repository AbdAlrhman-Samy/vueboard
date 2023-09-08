<template>
  <li class="flex flex-row gap-4 items-center  hover:bg-main-soft hover:bg-opacity-10 transition-all duration-200 ease-in-out rounded-tl-3xl rounded-br-3xl rounded-bl rounded-tr p-2">
    <span class="text-gray-400 font-bold text-xs p-1">
      {{ props.rank }}
    </span>

    <img :src="props.image" :alt="props.name" class="w-14 h-14 rounded-tl-xl rounded-br-xl rounded-bl rounded-tr" />

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

<script setup lang="ts">

const props = defineProps({
  rank: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
})

</script>

<style scoped>

</style>