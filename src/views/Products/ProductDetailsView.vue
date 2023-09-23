<script lang="ts" setup>
import { onUnmounted, ref, computed } from 'vue'
import { useFetch } from '@/composables/useFetch'
import { useRoute } from 'vue-router'
import { StarIcon } from '@heroicons/vue/24/outline'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

const selectedImage = ref<string>('')

const route = useRoute()

const { data, isLoading, error, cancel } = useFetch<Product>(
  `https://dummyjson.com/products/${route.params.id}`
)

onUnmounted(() => {
  if (isLoading.value) cancel()
})

const initialImage = computed(() => data.value?.images[0] || '')

interface Product {
  id: string
  title: string
  brand: string
  price: number
  discountPercentage: number
  description: string
  image: string
  category: string
  stock: number
  rating: number
  images: string[]
}
</script>

<template>
  <LoadingIndicator :isLoading="isLoading" />

  <div
    v-if="data && !isLoading"
    class="flex h-full flex-col items-center justify-between gap-4 lg:flex-row"
  >
    <div class="flex flex-col lg:w-2/5">
      <hgroup>
        <p class="text-base font-semibold text-secondary">{{ data.category }} / {{ data.brand }}</p>
        <h1 class="text-2xl font-semibold text-main">{{ data.title }}</h1>
        <p class="text-base font-semibold text-secondary">
          {{ data.description }}
        </p>
      </hgroup>

      <div class="mt-4 flex flex-row items-center gap-4">
        <span class="text-2xl font-semibold text-main"> ${{ data.price }} </span>
        <span class="text-lg font-semibold text-secondary line-through">
          ${{ data.price + data.price * (data.discountPercentage / 100) }}
        </span>
      </div>

      <div class="mt-4 flex flex-row items-center gap-4">
        <div class="flex flex-row items-center gap-2">
          <StarIcon class="h-6 w-6 text-main" />
          <span class="font-semibold text-main">{{ data.rating }}</span>
        </div>
        <span class="font-semibold text-main"> {{ data.stock }} in stock </span>
      </div>

      <RouterLink to="/products">
        <button class="mt-4 rounded-lg bg-main p-4 font-semibold text-light hover:shadow">
          Back to Products
        </button>
      </RouterLink>
    </div>

    <div class="flex w-full flex-col items-center justify-center gap-4 lg:w-1/2">
      <img
        :src="selectedImage ? selectedImage : initialImage"
        alt="Product Image"
        class="h-96 w-full rounded-xl border-2 border-main object-contain"
      />

      <div class="flex flex-row items-center gap-4">
        <img
          v-for="(image, index) in data.images"
          :key="index"
          :src="image"
          @click="selectedImage = image"
          alt="Product Image"
          class="h-16 w-16 cursor-pointer rounded-lg border-2 object-cover shadow-lg hover:border-main hover:shadow-xl"
          :class="selectedImage === image ? 'border-main shadow-xl' : 'border-transparent'"
        />
      </div>
    </div>
  </div>
</template>
