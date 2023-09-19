<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import { ref, computed, onBeforeUnmount, toRaw, watch } from 'vue';
import ProductCard from './ProductCard.vue';

const skip = ref<number>(0);
const filter = ref<string>('');

const { data: products, isLoading, error, cancel, refetch } = useFetch<ProductResponse>(`https://dummyjson.com/products?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`);
const { data: categories, isLoading: isCategoriesLoading, error: categoriesError, cancel: cancelCategoriesFetch } = useFetch<string[]>(`https://dummyjson.com/products/categories`);

watch(skip, () => {
  refetch(`https://dummyjson.com/products?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`);
});

watch(filter, () => {
  if (!products.value) return;
  skip.value = 0;
  if (!filter.value) return refetch(`https://dummyjson.com/products?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`);
  refetch(`https://dummyjson.com/products/category/${filter.value}?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`)
});

onBeforeUnmount(() => {
  cancel();
  cancelCategoriesFetch();
});



const computedProducts = computed(() => {
  if (!products.value) return [];
  const productsList = toRaw(products.value.products);
  return productsList;
});

const shouldNextBeDisabled = computed(() => {
  if (!products.value) return true;
  if (skip.value === products.value.total - products.value.limit) return true; // guess i'm not that bad at math
});


interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductResponse {
  products: Product[];
  total: number;
  limit: number;
  skip: number;
}


</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-full">
    <!-- Loading Indicator -->
    <div class="w-32 h-32 border-4 border-b-0 rounded-full animate-spin border-main"></div>
  </div>

  <div v-if="error || categoriesError" class="flex items-center justify-center h-full">
    <!-- Error Message -->
    <h2 class="text-2xl font-bold text-red-500">
      Error
    </h2>

    <pre class="text-red-500">
      {{ error || categoriesError }}
    </pre>
  </div>

  <div v-if="categories && !isLoading" class="flex items-center justify-center gap-4 my-4 mb-4 lg:flex-row">
    <!-- Category Filter -->
    <span class="text-lg font-bold text-main">
      Category:
    </span>

    <select v-if="categories" :disabled="isCategoriesLoading"
      class="p-2 font-semibold bg-white border-2 rounded-tr rounded-bl cursor-pointer border-main rounded-tl-xl rounded-br-xl disabled:opacity-50 disabled:cursor-not-allowed text-main"
      v-model="filter">
      <option value="">All</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
      </option>
    </select>

  </div>


  <!-- Products List -->
  <div v-if="computedProducts.length && !isLoading"
    class="grid items-center justify-center w-full h-full grid-cols-1 gap-4 p-4 overflow-auto border rounded sm:grid-cols-2 lg:grid-cols-3 bg-bg-light">
    <ProductCard v-for="product in computedProducts" :key="product.id" :product="product" />
  </div>

  <!-- Pagination Controls -->
  <div class="flex items-center justify-center w-full gap-8 py-4">
    <button @click="skip -= 12" :disabled="skip === 0"
      class="px-4 py-1 transition-colors bg-white border-2 rounded border-main text-main rounded-tr-xl rounded-bl-xl disabled:opacity-50 hover:bg-main hover:text-white disabled:cursor-not-allowed">
      Prev
    </button>

    <div v-if="!error && !categoriesError && products" class="flex flex-col items-center justify-center">
      <span class="text-lg font-bold text-main">
        {{ skip / 12 + 1 }} / {{ Math.ceil(products?.total / 12) }}
      </span>
    </div>

    <button @click="skip += 12" :disabled="shouldNextBeDisabled"
      class="px-4 py-1 transition-colors bg-white border-2 rounded border-main text-main rounded-tl-xl rounded-br-xl disabled:opacity-50 hover:bg-main hover:text-white disabled:cursor-not-allowed">
      Next
    </button>
  </div>
</template>