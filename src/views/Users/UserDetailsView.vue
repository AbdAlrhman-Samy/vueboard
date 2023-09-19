<script setup lang="ts">
import { onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetch } from '../../composables/useFetch'

const route = useRoute()
const router = useRouter()
const id = route.params.id

// type <any> because the response is a huge object, and this page wasn't meant to stay anyway
const { data: user, error, isLoading, cancel } = useFetch<any>(`https://dummyjson.com/users/${id}`)

onUnmounted(() => {
  cancel()
})

watch(user, () => {
  if(user.value.message) {
    router.push('/404')
  }
})


</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    
    <div v-if="isLoading" class="flex items-center justify-center w-full h-full my-2 animate-pulse">
      <span class="text-4xl">Loading...</span>
    </div>

    <div v-else-if="error" class="flex items-center justify-center animate-pulse">
      <span class="text-2xl">Error: {{ error }}</span>
    </div>

    <pre v-else-if="user" class="h-full max-w-full p-2 my-2 overflow-auto whitespace-pre rounded bg-bg-light">
      {{ user }}
    </pre>

    <RouterLink to="/users" class="px-4 py-2 font-semibold rounded bg-main hover:bg-secondary text-light">
      Back to All Users
    </RouterLink>

  </div>
</template>