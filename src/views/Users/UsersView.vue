<script setup lang="ts">
import { computed, onUnmounted, ref, toRaw } from 'vue';
import UserListItem from '@/views/Users/UserListItem.vue'
import { useFetch } from '../../composables/useFetch'

const search = ref<string>('')
const filter = ref<string>('name')

const { data: users, error, isLoading, cancel } = useFetch<UserResponse>(`https://dummyjson.com/users?limit=100&select=id,firstName,lastName,email,phone,image,address`)

onUnmounted(() => {
  cancel()
})


const computedUsers = computed(() => {
  if (!users.value) return []
  const usersList = toRaw(users.value.users)

  switch (filter.value.toLocaleLowerCase()) {
    case 'name':
      return usersList.filter(user => user.firstName.toLowerCase().includes(search.value) || user.lastName.toLowerCase().includes(search.value))

    case 'email':
      return usersList.filter(user => user.email.toLocaleLowerCase().includes(search.value))

    case 'phone':
      return usersList.filter(user => user.phone.toLocaleLowerCase().includes(search.value))

    case 'address':
      return usersList.filter(user => user.address.address.toLocaleLowerCase().includes(search.value) )
    
    default:
      return usersList
  }
  
})


interface UserResponse {
  users: User[]
}

</script>

<template>
  

  <div class="overflow-auto h-96">

    <div v-if="isLoading" class="flex items-center justify-center h-full">
    <!-- Loading Spinner (Create a reusable loader component) -->
      <div class="w-32 h-32 border-4 border-b-0 rounded-full animate-spin border-main"></div>
    </div>

    <div v-if="error" class="flex items-center justify-center h-full">
    <!-- Error Message -->
      <h2 class="text-2xl">Error</h2>
      <pre>
        {{ error }}
      </pre>
    </div>

    <!-- No Users Found -->
    <div v-if="!computedUsers.length && !isLoading" class="flex items-center justify-center h-full">
      <span class="text-2xl">No users found</span>
    </div>

    <table v-else class="w-full table-auto">
      <thead class="sticky top-0 bg-light text-main">
        <tr>
          <th class="p-4 text-left w-max">ID</th>
          <th class="p-4 text-left w-max">User</th>
          <th class="p-4 text-left w-max">Email</th>
          <th class="p-4 text-left w-max">Phone</th>
          <th class="p-4 text-left w-max">Address</th>
          <th class="p-4 text-left w-max">Details</th>
        </tr>
      </thead>

      <tbody class=" text-main">
        <!-- Users List -->
        <UserListItem v-if="computedUsers.length" v-for="user in computedUsers" :key="user.id" :user="user" />
      </tbody>

    </table>
  </div>

  <!-- Search Bar -->
  <div class="flex flex-col items-center justify-center gap-4 my-4 mb-4 lg:flex-row">
    <input type="text" v-model="search" placeholder="Search"
      class="p-2 border rounded-tr rounded-bl border-main rounded-tl-xl rounded-br-xl">
    
    <div>
      <span>
        Search by:
      </span>
      <select class="p-2 border rounded-tr rounded-bl border-main rounded-tl-xl rounded-br-xl" v-model="filter">
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="address">Address</option>
      </select>
    </div>
  </div>
</template>