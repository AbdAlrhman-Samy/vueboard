<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import Button from '../Button.vue'

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

      <Button
        @click="router.push({ name: 'product-details', params: { id: props.product.id } })"
        title=""
        class="ml-auto"
      >
        <InformationCircleIcon class="h-6 w-6" />
      </Button>
    </div>
  </div>
</template>
