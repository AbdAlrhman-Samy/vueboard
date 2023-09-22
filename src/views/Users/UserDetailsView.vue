<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
  if (user.value.message) {
    router.push('/404')
  }
})
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <div v-if="isLoading" class="my-2 flex h-full w-full animate-pulse items-center justify-center">
      <span class="text-4xl">Loading...</span>
    </div>

    <div v-else-if="error" class="flex animate-pulse items-center justify-center">
      <span class="text-2xl">Error: {{ error }}</span>
    </div>

    <pre
      v-else-if="user"
      class="my-2 h-full max-w-full overflow-auto whitespace-pre rounded bg-bg-light p-2"
    >
      {{ user }}
    </pre>

    <RouterLink
      to="/users"
      class="rounded bg-main px-4 py-2 font-semibold text-light hover:bg-secondary"
    >
      Back to All Users
    </RouterLink>
  </div>
</template>
