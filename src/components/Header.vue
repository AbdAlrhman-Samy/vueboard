<script setup lang="ts">
import { BellIcon, UserIcon } from '@heroicons/vue/24/solid';
import PhoneNav from './PhoneNav.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute()
const routeName = ref<string>('')

watch(
  () => route.name as string,
  (name) => {
    if (name) {
      if (name === 'home') {
        routeName.value = 'Welcome!'
      } else {
        routeName.value = name.charAt(0).toUpperCase() + name.slice(1)
      }
    }
  }, {
  immediate: true
}
)

</script>

<template>
  <div class="flex flex-col items-center justify-between w-full gap-8 mb-4 lg:flex-row ">

    <h1 class="text-4xl font-semibold text-main">
      {{ routeName }}
    </h1>

    <div class="flex flex-row items-center gap-4">
      <button
        class="relative flex flex-row items-center p-4 rounded-tr rounded-bl text-main bg-light hover:shadow rounded-tl-xl rounded-br-xl">
        <BellIcon class="w-6 h-6" />
        <span
          class="absolute flex items-center justify-center w-4 h-4 font-bold rounded-full -top-1 -right-1 bg-main outline-4 outline-white outline">
        </span>
      </button>

      <button
        class="flex flex-row items-center p-4 rounded-tr rounded-bl text-main bg-light hover:shadow rounded-tl-xl rounded-br-xl">
        <UserIcon class="w-6 h-6" />
      </button>

      <PhoneNav />

    </div>

  </div>
</template>
