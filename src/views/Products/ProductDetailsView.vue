<script lang="ts" setup>
import { useFetch } from '@/composables/useFetch'
import { useRoute } from 'vue-router'

const route = useRoute()

const { data, isLoading, error, cancel, refetch } = useFetch(
  `https://dummyjson.com/products/${route.params.id}`
)
</script>

<template>
  <div class="mx-4 flex h-full w-full flex-col bg-black px-8 py-2 text-main lg:flex-row"></div>
</template>
