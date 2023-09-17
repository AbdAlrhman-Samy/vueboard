<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import { computed, onBeforeUnmount, toRaw } from 'vue';
import ProductCard from './ProductCard.vue';


const { data: products, isLoading, error, cancel } = useFetch<ProductResponse>('https://dummyjson.com/products?limit=100&select=id,title,price,thumbnail');

onBeforeUnmount(() => {
  cancel();
});


const computedProducts = computed(() => {
  if (!products.value) return [];
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

  <div v-if="error" class="flex items-center justify-center h-full">
    <h2 class="text-2xl font-bold text-red-500">
      Error
    </h2>

    <pre class="text-red-500">
      {{ error }}
    </pre>
  </div>

  <div v-if="computedProducts.length" class="grid items-center justify-center h-full grid-cols-1 gap-4 overflow-auto place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <ProductCard v-for="product in computedProducts" :key="product.id" :product="product" />
  </div>
</template>