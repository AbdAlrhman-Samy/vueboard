<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold">
      User {{ route.params.id }} Details
    </h1>

    <div class="flex flex-col items-center justify-center">
      <div v-if="loading" class="flex items-center justify-center animate-pulse">
        <span class="text-2xl">Loading...</span>
        
      </div>

      <div v-else-if="user" class="flex flex-col items-center justify-center gap-4">

        <div>
          <router-link to="/users" class="text-main hover:text-main-dark">
            <span class="text-2xl">Back to Users</span>
          </router-link>
        </div>

        <img :src="user.image" :alt="user.firstName" class="w-32 h-32 bg-main p-1 rounded-full">
        <span class="text-2xl">Name: {{ user.firstName + ' ' + user.lastName }}</span>
        <span class="text-2xl"> Birth Date:
          {{ user.birthDate }}</span>
        <span class="text-2xl"> Email:
          {{ user.email }}</span>
        <span class="text-2xl"> Phone:
          {{ user.phone }}</span>
        <span class="text-2xl"> Address:
          {{ user.address.address }}</span>
        <span class="text-2xl"> State:
          {{ user.address.state }}</span>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

interface UserDetails extends User {
  address: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
  },
  birthDate: string;
}

const user = ref<UserDetails | null>(null)
const loading = ref<boolean>(false)

const route = useRoute()

watch(() => route.params.id, async (id) => {
  if (!id) return
  console.log('id', id)
  loading.value = true
  const response = await fetch(`https://dummyjson.com/users/${id}`)
  const data = await response.json()
  user.value = data
  loading.value = false
},
  { immediate: true }
)

</script>



<style scoped></style>