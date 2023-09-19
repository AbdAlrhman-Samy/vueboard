<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/24/solid';
const props = defineProps<{
  user: User
}>()

</script>

<template>
  <tr class="border-b border-b-gray-200 hover:bg-gray-50">
    <td class="px-2 py-4 text-center">{{ user.id }}</td>

    <td class="px-2 py-4 whitespace-nowrap">
      {{ user.firstName + ' ' + user.lastName }}
    </td>

    <td class="px-2 py-4 whitespace-nowrap">{{ user.email }}</td>

    <td class="px-2 py-4 whitespace-nowrap">{{ user.phone }}</td>

    <td class="px-2 py-4">{{ user.address.address }}</td>
    
    <td class="px-2 py-4 text-center whitespace-nowrap">
      <button class="p-1 text-white rounded-full bg-main hover:bg-opacity-80"
        @click="$router.push({ name: 'user-details', params: { id: user.id } })">
        <InformationCircleIcon class="w-6 h-6" />
      </button>
    </td>
  </tr>
</template>

<style scoped></style>