<script setup lang="ts">
import SideNav from './components/SideNav.vue';
import Header from './components/Header.vue';

</script>

<template>
  <div class="flex flex-row h-screen p-2 bg-bg-light lg:p-4">

    <SideNav />

    <main class="container flex flex-col max-w-full p-2 mx-auto bg-white border border-l-0 rounded-3xl lg:py-8 lg:px-16">
      <Header />

      <div class="flex flex-col overflow-auto grow">
        <RouterView />
      </div>

    </main>

  </div>
</template>
