<script lang="ts" setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
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
    class="flex h-full w-full flex-row items-center justify-between gap-4 rounded-br-2xl rounded-tl-2xl bg-white p-4 transition-shadow hover:shadow-lg active:shadow"
  >
    <img
      :src="props.product.thumbnail"
      :alt="props.product.title"
      class="h-32 w-32 rounded border-2 border-main object-cover"
    />

    <div class="flex h-full w-full flex-col items-start justify-start gap-4">
      <hgroup class="flex h-full w-full flex-col items-start justify-start gap-2">
        <h2 class="text-lg font-bold text-main">
          {{ props.product.title }}
        </h2>

        <p class="text-lg font-medium text-main">${{ props.product.price }}</p>
      </hgroup>

      <!-- Action Buttons -->
      <button
        @click="router.push({ name: 'product-details', params: { id: props.product.id } })"
        class="self-end rounded-br-md rounded-tl-md border-2 border-main p-1 text-main transition-colors hover:bg-main hover:text-light"
      >
        <InformationCircleIcon class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>
