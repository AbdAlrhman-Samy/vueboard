<script setup lang="ts">
import { BellIcon, UserIcon } from '@heroicons/vue/24/solid';
import PhoneNav from './PhoneNav.vue';

</script>

<template>
  <div class="flex lg:flex-row flex-col-reverse gap-8 justify-between items-center w-full mb-8">

    <div>
      <h1 class="text-4xl font-normal text-main">
        Welcome, 
        <span class="text-main font-bold">
          Stark
        </span>
      </h1>
    </div>

    <div class="flex flex-row items-center gap-4">
      <button class="flex flex-row items-center p-4 text-main bg-light hover:shadow rounded-tl-xl rounded-br-xl rounded-bl rounded-tr relative">
        <BellIcon class="w-6 h-6" />
        <span class="absolute -top-1 -right-1 bg-main font-bold rounded-full w-4 h-4 outline-4 outline-white outline flex justify-center items-center">
        </span>
      </button>
      
      <button class="flex flex-row items-center p-4 text-main bg-light hover:shadow rounded-tl-xl rounded-br-xl rounded-bl rounded-tr">
        <UserIcon class="w-6 h-6" />
      </button>

      <PhoneNav />

    </div>

  </div>
</template>

<style scoped>

</style>