<script setup lang="ts">
import { BellIcon, UserIcon } from '@heroicons/vue/24/solid'
import PhoneNav from './PhoneNav.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import Notifications from './Notifications.vue'

const route = useRoute()
const routeName = ref<string>('')

watch(
  () => route.name as string,
  (name) => {
    if (name) {
      if (name === 'home') {
        routeName.value = 'Welcome!'
      } else {
        const adjustedName: string = name.split('-').join(' ')
        routeName.value = adjustedName.charAt(0).toUpperCase() + adjustedName.slice(1)
      }
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="mb-4 flex w-full flex-col items-center justify-between gap-8 lg:flex-row">
    <h1 class="text-4xl font-semibold text-main">
      {{ routeName }}
    </h1>

    <div class="flex flex-row items-center gap-4">
      <Notifications />

      <button
        class="flex flex-row items-center rounded-bl rounded-br-xl rounded-tl-xl rounded-tr bg-light p-4 text-main hover:shadow-inner"
      >
        <UserIcon class="h-6 w-6" />
      </button>

      <PhoneNav />
    </div>
  </div>
</template>
