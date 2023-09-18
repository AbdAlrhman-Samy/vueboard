<script lang="ts" setup>
import { TrashIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';


const props = defineProps<Props>();

interface Props {
  product: {
    thumbnail: string;
    title: string;
    price: number;
  },
}

</script>

<template>
  <div class="flex flex-col items-center justify-between w-full h-full gap-4 p-4 bg-bg-light rounded-tl-2xl rounded-br-2xl">
    <hgroup>
      <h2 class="text-xl font-medium text-center text-main">
        {{ props.product.title }}
      </h2>

      <h3 class="text-lg font-bold text-center text-main">
        ${{ props.product.price }}
      </h3>
    </hgroup>
    <img :src="props.product.thumbnail" :alt="props.product.title" class="object-contain w-32 h-32 border-2 rounded-full border-main" />

    <div class="flex items-center justify-between w-full gap-4">
      <button class="flex items-center justify-center gap-2 p-2 text-center text-red-500 transition-colors border border-red-500 w-fit hover:bg-red-500 hover:text-white rounded-bl-md rounded-tr-md">
        <TrashIcon class="w-6 h-6" />
      </button>

      <button class="flex items-center justify-center w-full gap-2 p-2 text-center text-white transition-shadow rounded bg-main hover:shadow-md rounded-tl-md rounded-br-md">
        <InformationCircleIcon class="w-6 h-6" />
        View Details
      </button>

    </div>

  </div>
</template>
