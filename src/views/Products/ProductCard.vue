<script lang="ts" setup>
import { TrashIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<Props>()

interface Props {
  product: {
    id: number | string
    title: string
    price: number
    thumbnail: string
  }
}
</script>

<template>
  <div
    class="flex h-full w-full flex-row items-center justify-between gap-4 rounded-br-2xl rounded-tl-2xl bg-white p-4 transition-shadow hover:shadow active:shadow"
  >
    <img
      :src="props.product.thumbnail"
      :alt="props.product.title"
      class="h-full w-32 rounded border-2 border-main object-cover"
    />

    <div class="flex h-full w-full flex-col items-start justify-start gap-4">
      <hgroup class="flex h-full w-full flex-col items-start justify-start gap-2">
        <h2 class="text-lg font-bold text-main">
          {{ props.product.title }}
        </h2>

        <p class="text-lg font-medium text-main">${{ props.product.price }}</p>
      </hgroup>

      <!-- Action Buttons -->
      <div class="flex w-full items-center justify-end gap-2">
        <button
          class="flex w-fit items-center justify-center gap-2 rounded-bl-md rounded-tr-md bg-red-500 p-2 text-center text-white transition-colors hover:bg-opacity-80 hover:text-white"
        >
          <TrashIcon class="h-5 w-5" />
        </button>

        <button
          @click="router.push({ name: 'product-details', params: { id: props.product.id } })"
          class="flex items-center justify-center gap-2 rounded-br-md rounded-tl-md bg-main p-2 text-center text-white transition-colors hover:bg-opacity-80"
        >
          <InformationCircleIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>
