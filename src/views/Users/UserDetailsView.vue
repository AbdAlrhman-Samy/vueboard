<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '../../composables/useFetch'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

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
  <LoadingIndicator :isLoading="isLoading" />

  <Error :error="error" />

  <pre
    v-if="user"
    class="my-2 h-full w-full max-w-6xl overflow-auto whitespace-pre rounded bg-bg-light p-2"
  >
      {{ user }}
    </pre
  >

  <RouterLink
    to="/users"
    class="ml-auto w-fit rounded bg-main px-4 py-2 font-semibold text-light hover:bg-secondary"
  >
    Back to All Users
  </RouterLink>
</template>
