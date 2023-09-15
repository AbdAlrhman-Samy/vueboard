<template>
  <tr class="border border-gray-200 hover:bg-gray-100" @click="$router.push({ name: 'user-details', params: { id: user.id } })">
        <td class="p-4 w-max">{{ user.id }}</td>
        <td class="p-4 w-max flex items-center justify-center">
          <img :src="user.image" :alt="user.firstName" class="w-10 h-10 rounded-full">
          <span>{{ user.firstName + ' ' + user.lastName }}</span>
        </td>
        <td class="p-4 w-max whitespace-nowrap">{{ user.email }}</td>
        <td class="p-4 w-max whitespace-nowrap">{{ user.phone }}</td>
        <td class="p-4 w-max whitespace-nowrap">{{ user.address.address }}</td>
      </tr>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: User
}>()



</script>

<style scoped>

</style>