<template>
  <div class="flex flex-row h-screen bg-bg-light lg:p-6 p-2">

    <SideNav />

    <main class="container mx-auto rounded-3xl bg-white lg:py-12 lg:px-24 p-4">
      <Header />
      <RouterView />
    </main>

  </div>
  
</template>

<script setup lang="ts">
import SideNav from './components/SideNav.vue';
import Header from './components/Header.vue';

</script>

<style scoped>

</style>