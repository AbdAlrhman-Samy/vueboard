<template>

<div class="flex flex-row items-center lg:justify-start justify-center mb-4 w-full">
  <input type="text" v-model="search" placeholder="Search" class="border border-main rounded-tl-xl rounded-br-xl rounded-bl rounded-tr p-2">
</div>

  <div class="overflow-scroll h-4/5 border min-w-full border-main">
    <table class="table-auto">
    <thead class="bg-light sticky  top-0 text-main">
      <tr>
        <th class="p-4 text-left w-max">ID</th>
        <th class="p-4 text-left w-max">User</th>
        <th class="p-4 text-left w-max">Email</th>
        <th class="p-4 text-left w-max">Phone</th>
        <th class="p-4 text-left w-max">Address</th>
      </tr>
    </thead>

    <tbody class="text-main w-full">
      <tr v-if="filteredUsers.length === 0">
        <td class="p-4 w-max">No users found</td>
      </tr>

      <tr v-else-if="filteredUsers.length" v-for="user in filteredUsers" :key="`${user.id}FILTERED`">
        <td class="p-4 w-max">{{ user.id }}</td>
        <td class="p-4 w-max flex items-center justify-center">
          <img :src="user.image" :alt="user.firstName" class="w-10 h-10 rounded-full">
          <span>{{ user.firstName + ' ' + user.lastName }}</span>
        </td>
        <td class="p-4 w-max">{{ user.email }}</td>
        <td class="p-4 w-max whitespace-nowrap">{{ user.phone }}</td>
        <td class="p-4 w-max">{{ user.address.address }}</td>
      </tr>

      <tr v-else v-for="user in users" :key="user.id">
        <td class="p-4 w-max">{{ user.id }}</td>
        <td class="p-4 w-max flex items-center justify-center">
          <img :src="user.image" :alt="user.firstName" class="w-10 h-10 rounded-full">
          <span>{{ user.firstName + ' ' + user.lastName }}</span>
        </td>
        <td class="p-4 w-max">{{ user.email }}</td>
        <td class="p-4 w-max whitespace-nowrap">{{ user.phone }}</td>
        <td class="p-4 w-max">{{ user.address.address }}</td>
      </tr>
    </tbody>

  </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';


const users = ref<any[]>([])
const search = ref('')

async function getUsers() {
  const data = await fetch('https://dummyjson.com/users?limit=100')
  const json = await data.json()
  users.value = json.users
}

getUsers()

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    let result = user.firstName.toLowerCase().includes(search.value.toLowerCase())
    return result
  })
})




</script>

<style scoped></style>