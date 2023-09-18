<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import { ref, computed, onBeforeUnmount, toRaw, watch } from 'vue';
import ProductCard from './ProductCard.vue';

const skip = ref<number>(0);
const filter = ref<string>('');

/**
 * !: handle pagination buttons better
 * they should be disabled when there are no more products to show
 * they also shouldn't refetch all the products again
 */

const { data: products, isLoading, error, cancel, refetch } = useFetch<ProductResponse>(`https://dummyjson.com/products?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`);
const { data: categories, isLoading: isCategoriesLoading, error: categoriesError, cancel: cancelCategoriesFetch } = useFetch<string[]>(`https://dummyjson.com/products/categories`);

watch(skip, () => {
  refetch(`https://dummyjson.com/products?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`);
});

watch(filter, () => {
  if (!products.value) return;
  skip.value = 0;
  /**
   * TODO: use a computed property to handle urls
   * or maybe a watcher?
   */ 
  if (!filter.value) return refetch(`https://dummyjson.com/products?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`);
  refetch(`https://dummyjson.com/products/category/${filter.value}?limit=12&skip=${skip.value}&select=id,title,price,thumbnail`)
});

onBeforeUnmount(() => {
  cancel();
  cancelCategoriesFetch();
});


const computedProducts = computed(() => {
  if (!products.value) return [];
  console.log(products.value)
  const productsList = toRaw(products.value.products);
  return productsList;
});

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductResponse {
  products: Product[];
}


</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-full">
    <div class="w-32 h-32 border-4 border-b-0 rounded-full animate-spin border-main"></div>
  </div>

  <div v-if="error || categoriesError" class="flex items-center justify-center h-full">
    <h2 class="text-2xl font-bold text-red-500">
      Error
    </h2>

    <pre class="text-red-500">
      {{ error || categoriesError }}
    </pre>
  </div>

  <div v-if="categories && !isCategoriesLoading" class="flex items-center justify-center gap-4 my-4 mb-4 lg:flex-row">
    <span class="text-lg font-bold text-main">
      Category:
    </span>

    <select v-if="categories" :disabled="isCategoriesLoading"
      class="p-2 border rounded-tr rounded-bl cursor-pointer border-main rounded-tl-xl rounded-br-xl disabled:opacity-50 disabled:cursor-not-allowed"
      v-model="filter">
      <option value="">All</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
      </option>
    </select>

  </div>

  <div v-if="computedProducts.length && !isLoading"
    class="grid items-center justify-center h-full grid-cols-1 gap-4 overflow-auto sm:grid-cols-2 md:grid-cols-3">
    <ProductCard v-for="product in computedProducts" :key="product.id" :product="product" />
  </div>

  <div class="flex items-center justify-center w-full gap-8 py-4">
    <button @click="skip -= 10" :disabled="skip === 0"
      class="px-4 py-2 border-2 text-secondary border-secondary rounded-xl disabled:opacity-50">
      Previous
    </button>

    <button @click="skip += 10" :disabled="skip === 90"
      class="px-4 py-2 text-white bg-main rounded-xl disabled:opacity-50">
      Next
    </button>
  </div>
</template>