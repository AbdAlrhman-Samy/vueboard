<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import { ref, computed, onBeforeUnmount, toRaw, watch } from 'vue'
import ProductCard from './ProductCard.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

const skip = ref<number>(0)
const filter = ref<string>('')

const {
  data: products,
  isLoading,
  error,
  cancel,
  refetch
} = useFetch<ProductResponse>(
  `https://dummyjson.com/products?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`
)
const {
  data: categories,
  isLoading: isCategoriesLoading,
  error: categoriesError,
  cancel: cancelCategoriesFetch
} = useFetch<string[]>(`https://dummyjson.com/products/categories`)

watch(skip, () => {
  refetch(
    `https://dummyjson.com/products?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`
  )
})

watch(filter, () => {
  if (!products.value) return
  skip.value = 0
  if (!filter.value)
    return refetch(
      `https://dummyjson.com/products?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`
    )
  refetch(
    `https://dummyjson.com/products/category/${filter.value}?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`
  )
})

onBeforeUnmount(() => {
  cancel()
  cancelCategoriesFetch()
})

const computedProducts = computed(() => {
  if (!products.value) return []
  const productsList = toRaw(products.value.products)
  return productsList
})

const shouldNextBeDisabled = computed(() => {
  if (!products.value) return true
  if (skip.value === products.value.total - products.value.limit || isLoading.value) return true // guess i'm not that bad at math
})

interface Product {
  id: string
  title: string
  price: number
  thumbnail: string
}

interface ProductResponse {
  products: Product[]
  total: number
  limit: number
  skip: number
}
</script>

<template>
  <LoadingIndicator :isLoading="isLoading" />

  <div v-if="error || categoriesError" class="flex h-full items-center justify-center">
    <!-- Error Message -->
    <h2 class="text-2xl font-bold text-red-500">Error</h2>

    <pre class="text-red-500">
      {{ error || categoriesError }}
    </pre>
  </div>

  <div
    v-if="categories && !isLoading"
    class="my-4 mb-4 flex items-center justify-center gap-4 lg:flex-row"
  >
    <!-- Category Filter -->
    <span class="text-lg font-bold text-main"> Category: </span>

    <select
      v-if="categories"
      :disabled="isCategoriesLoading"
      class="cursor-pointer rounded-bl rounded-br-xl rounded-tl-xl rounded-tr border-2 border-main bg-white p-2 font-semibold text-main disabled:cursor-not-allowed disabled:opacity-50"
      v-model="filter"
    >
      <option value="">All</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
      </option>
    </select>
  </div>

  <!-- Products List -->
  <div
    v-if="computedProducts.length && !isLoading"
    class="grid h-full w-full grid-cols-1 items-center justify-center gap-4 overflow-auto rounded border bg-bg-light p-4 sm:grid-cols-2 lg:grid-cols-3"
  >
    <ProductCard v-for="product in computedProducts" :key="product.id" :product="product" />
  </div>

  <!-- Pagination Controls -->
  <div class="flex w-full items-center justify-center gap-8 py-4">
    <button
      @click="skip -= 12"
      :disabled="skip === 0 || isLoading"
      class="rounded rounded-bl-xl rounded-tr-xl border-2 border-main bg-white px-4 py-1 text-main transition-colors hover:bg-main hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      Prev
    </button>

    <div
      v-if="!error && !categoriesError && products"
      class="flex flex-col items-center justify-center"
    >
      <span class="text-lg font-bold text-main">
        {{ skip / 12 + 1 }} / {{ Math.ceil(products?.total / 12) }}
      </span>
    </div>

    <button
      @click="skip += 12"
      :disabled="shouldNextBeDisabled"
      class="rounded rounded-br-xl rounded-tl-xl border-2 border-main bg-white px-4 py-1 text-main transition-colors hover:bg-main hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>
