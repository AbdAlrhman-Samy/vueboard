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
  <div class="flex flex-row items-center justify-between w-full h-full gap-4 p-4 transition-shadow bg-white rounded-tl-2xl rounded-br-2xl hover:shadow active:shadow">

    <img :src="props.product.thumbnail" :alt="props.product.title"
      class="object-cover w-32 h-full border-2 rounded border-main" />


    <div class="flex flex-col items-start justify-start w-full h-full gap-4">

      <hgroup class="flex flex-col items-start justify-start w-full h-full gap-2">
        <h2 class="text-lg font-bold text-main">
          {{ props.product.title }}
        </h2>

        <p class="text-lg font-medium text-main">
          ${{ props.product.price }}
        </p>
      </hgroup>

      <!-- Action Buttons -->
      <div class="flex items-center justify-end w-full gap-2">
        <button
          class="flex items-center justify-center gap-2 p-2 text-center text-white transition-colors bg-red-500 w-fit rounded-bl-md rounded-tr-md hover:bg-opacity-80 hover:text-white">
          <TrashIcon class="w-5 h-5" />
        </button>

        <button
          class="flex items-center justify-center gap-2 p-2 text-center text-white transition-colors bg-main rounded-tl-md rounded-br-md hover:bg-opacity-80">
          <InformationCircleIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
