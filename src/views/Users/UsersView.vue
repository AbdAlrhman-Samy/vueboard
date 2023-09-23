<script setup lang="ts">
import { computed, onUnmounted, ref, toRaw } from 'vue'
import UserListItem from '@/views/Users/UserListItem.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import { useFetch } from '../../composables/useFetch'
import Error from '@/components/Error.vue'

const search = ref<string>('')
const filter = ref<string>('name')

const {
  data: users,
  error,
  isLoading,
  cancel
} = useFetch<UserResponse>(
  `https://dummyjson.com/users?limit=100&select=id,firstName,lastName,email,phone,image,address`
)

onUnmounted(() => {
  cancel()
})

const computedUsers = computed(() => {
  if (!users.value) return []
  const usersList = toRaw(users.value.users)

  switch (filter.value) {
    case 'name':
      return usersList.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search.value.toLocaleLowerCase()) ||
          user.lastName.toLowerCase().includes(search.value.toLocaleLowerCase())
      )

    case 'email':
      return usersList.filter((user) =>
        user.email.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
      )

    case 'phone':
      return usersList.filter((user) =>
        user.phone.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
      )

    case 'address':
      return usersList.filter((user) =>
        user.address.address.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
      )

    default:
      return usersList
  }
})

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string
  address: {
    address: string
  }
}

interface UserResponse {
  users: User[]
}
</script>

<template>
  <!-- Search Bar -->
  <div class="my-4 mb-4 flex flex-col items-center justify-center gap-4 lg:flex-row">
    <input
      type="text"
      v-model="search"
      placeholder="Search"
      class="rounded-bl rounded-br-xl rounded-tl-xl rounded-tr border-2 border-main bg-white p-2 font-semibold text-main disabled:cursor-not-allowed disabled:opacity-50"
    />

    <div class="flex items-center justify-center gap-2">
      <span class="text-md font-bold text-main"> Search By </span>
      <select
        class="cursor-pointer rounded-bl rounded-br-xl rounded-tl-xl rounded-tr border-2 border-main bg-white p-2 font-semibold text-main disabled:cursor-not-allowed disabled:opacity-50"
        v-model="filter"
      >
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="address">Address</option>
      </select>
    </div>
  </div>

  <LoadingIndicator :isLoading="isLoading" />

  <Error :error="error" />

  <div v-if="!computedUsers.length && !isLoading" class="flex h-full items-center justify-center">
    <!-- No Users Found -->
    <span class="text-2xl">No users found</span>
  </div>

  <div v-if="computedUsers.length && !isLoading" class="overflow-auto">
    <table class="h-full w-full table-auto">
      <thead class="sticky top-0 bg-light text-main">
        <tr>
          <th class="p-4 text-left">ID</th>
          <th class="p-4 text-left">User</th>
          <th class="p-4 text-left">Email</th>
          <th class="p-4 text-left">Phone</th>
          <th class="p-4 text-left">Address</th>
          <th class="p-4 text-left">Details</th>
        </tr>
      </thead>

      <tbody class="text-main">
        <!-- Users List -->
        <UserListItem
          v-if="computedUsers.length"
          v-for="user in computedUsers"
          :key="user.id"
          :user="user"
        />
      </tbody>
    </table>
  </div>
</template>
