<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/24/solid';
const props = defineProps<{
  user: User
}>()

</script>

<template>
  <tr class="border border-gray-200 hover:bg-gray-100" >
        <td class="px-2 py-4 text-center">{{ user.id }}</td>
        <td class="flex items-center justify-start px-2 py-4 whitespace-nowrap">
          <img :src="user.image" :alt="user.firstName" class="w-10 h-10 rounded-full">
          <span>{{ user.firstName + ' ' + user.lastName }}</span>
        </td>
        <td class="px-2 py-4 whitespace-nowrap">{{ user.email }}</td>
        <td class="px-2 py-4 whitespace-nowrap">{{ user.phone }}</td>
        <td class="px-2 py-4 whitespace-nowrap">{{ user.address.address }}</td>
        <td class="px-2 py-4 whitespace-nowrap">
          <button class="p-1 text-white rounded-full bg-main" @click="$router.push({ name: 'user-details', params: { id: user.id } })">
            <InformationCircleIcon class="w-6 h-6" />
          </button>
        </td>
      </tr>
</template>

<style scoped>

</style>