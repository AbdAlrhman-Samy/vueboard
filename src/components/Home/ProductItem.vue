<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'

const router = useRouter()

const props = defineProps<Props>()

interface Props {
  rank: number
  product: {
    id: number | string
    title: string
    price: number
    thumbnail: string
  }
}
</script>

<template>
  <li
    class="flex flex-row items-center justify-between gap-4 rounded-bl rounded-br-3xl rounded-tl-3xl rounded-tr p-2 transition-all duration-200 ease-in-out hover:bg-main-soft hover:bg-opacity-10"
  >
    <div class="flex flex-row items-center gap-4">
      <span class="p-1 text-xs font-bold text-gray-400">
        {{ props.rank }}
      </span>

      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-14 w-14 rounded-bl rounded-br-xl rounded-tl-xl rounded-tr object-cover"
      />

      <hgroup>
        <h4 class="text-sm font-bold text-main">
          {{ product.title }}
        </h4>
        <p class="text-xs font-normal text-main">${{ product.price }}</p>
      </hgroup>
    </div>

    <button
      @click="router.push({ name: 'product-details', params: { id: product.id } })"
      class="rounded-full border-2 border-main bg-light p-1 text-main transition-colors hover:bg-main hover:text-light"
    >
      <ChevronRightIcon class="h-4 w-4" />
    </button>
  </li>
</template>
