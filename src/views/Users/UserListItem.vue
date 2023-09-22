<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/24/solid'
const props = defineProps<{
  user: User
}>()
</script>

<template>
  <tr class="border-b border-b-gray-200 hover:bg-gray-50">
    <td class="px-2 py-4 text-center">{{ user.id }}</td>

    <td class="whitespace-nowrap px-2 py-4">
      {{ user.firstName + ' ' + user.lastName }}
    </td>

    <td class="whitespace-nowrap px-2 py-4">{{ user.email }}</td>

    <td class="whitespace-nowrap px-2 py-4">{{ user.phone }}</td>

    <td class="px-2 py-4">{{ user.address.address }}</td>

    <td class="whitespace-nowrap px-2 py-4 text-center">
      <button
        class="rounded-full bg-main p-1 text-white hover:bg-opacity-80"
        @click="$router.push({ name: 'user-details', params: { id: user.id } })"
      >
        <InformationCircleIcon class="h-6 w-6" />
      </button>
    </td>
  </tr>
</template>

<style scoped></style>
