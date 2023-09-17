<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from '../../composables/useFetch'

const route = useRoute()
const id = route.params.id

const { data: user, error, isLoading, cancel } = useFetch(`https://dummyjson.com/users/${id}`)

onUnmounted(() => {
  cancel()
})

</script>

<template>
  <div class="flex flex-col items-center justify-center">
    
    <div v-if="isLoading" class="flex items-center justify-center w-full my-2 animate-pulse h-96">
      <span class="text-4xl">Loading...</span>
    </div>

    <div v-else-if="error" class="flex items-center justify-center animate-pulse">
      <span class="text-2xl">Error: {{ error }}</span>
    </div>

    <pre v-else-if="user" class="max-w-full p-2 my-2 overflow-scroll whitespace-pre rounded bg-bg-light h-96">
      {{ user }}
    </pre>

    <RouterLink to="/users" class="px-4 py-2 font-semibold rounded bg-main hover:bg-secondary text-light">
      Back to All Users
    </RouterLink>

  </div>
</template>