<script setup lang="ts">
import SideNav from './components/SideNav.vue'
import Header from './components/Header.vue'
</script>

<template>
  <div class="flex h-screen w-screen flex-row overflow-hidden bg-bg-light p-2 lg:p-4">
    <SideNav />

    <main
      class="container mx-auto flex max-w-full flex-col rounded-3xl border bg-white p-2 lg:border-l-0 lg:px-16 lg:py-8"
    >
      <Header />

      <div class="flex grow flex-col overflow-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
