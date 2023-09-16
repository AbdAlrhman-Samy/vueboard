<template>
  <!-- Search Bar -->
  <div class="flex flex-row items-center lg:justify-start justify-center mb-4 w-full">
    <input type="text" v-model="search" placeholder="Search"
      class="border border-main rounded-tl-xl rounded-br-xl rounded-bl rounded-tr p-2">
  </div>

  <div class="overflow-scroll h-96 w-full border-main">

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex items-center justify-center h-full">
      <div class="animate-spin rounded-full h-32 w-32 border-4 border-b-0 border-main"></div>
    </div>

    <!-- No Users Found -->
    <div v-if="!filteredUsers.length || !users.length && !loading" class="flex items-center justify-center h-full">
      <span class="text-2xl">No users found</span>
    </div>

    <table v-else class="table-auto w-full">
      <thead class="bg-light sticky  top-0 text-main">
        <tr>
          <th class="p-4 text-left w-max">ID</th>
          <th class="p-4 text-left w-max">User</th>
          <th class="p-4 text-left w-max">Email</th>
          <th class="p-4 text-left w-max">Phone</th>
          <th class="p-4 text-left w-max">Address</th>
        </tr>
      </thead>

      <tbody class="text-main w-full p-2">
        <!-- Filtered Users List -->
        <UserListItem v-if="filteredUsers.length" v-for="user in filteredUsers" :key="user.id + 'F'" :user="user" />
        <!-- All Users List -->
        <UserListItem v-else-if="!filteredUsers.length && !loading" v-for="user in users" :key="user.id" :user="user" />
      </tbody>

    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import UserListItem from '@/views/Users/UserListItem.vue'

const users = ref<User[]>([])
const search = ref<string>('')
const loading = ref<boolean>(false)

async function getUsers() {
  loading.value = true
  const data = await fetch('https://dummyjson.com/users?limit=100&select=id,firstName,lastName,email,phone,image,address')
  const json = await data.json()
  users.value = json.users
  loading.value = false
}

getUsers()

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    return user.firstName.toLowerCase().includes(search.value.toLowerCase())
  })
})


</script>

<style scoped></style>