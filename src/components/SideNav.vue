<script setup lang="ts">
import { BuildingStorefrontIcon, HomeIcon, UserGroupIcon, ShoppingCartIcon, ClipboardDocumentListIcon } from '@heroicons/vue/24/outline';
import NavItem from './NavItem.vue';
</script>

<template>
  <div class="lg:flex flex-col justify-between pl-8 w-1/5 py-8 rounded-xl hidden">

    <div class="flex flex-row items-center gap-4 text-main">
      <BuildingStorefrontIcon class="w-8 h-8" />
      <h2 class="text-2xl font-bold cursor-default">
        VueBoard
      </h2>
    </div>

    <nav class="flex flex-col items-center gap-4 w-full">

      <NavItem to="/">
        <HomeIcon class="w-6 h-6" />
        <span class="">Home</span>
      </NavItem>

      <NavItem to="/users">
        <UserGroupIcon class="w-6 h-6" />
        <span class="">Users</span>
      </NavItem>

      <NavItem to="/products">
        <ShoppingCartIcon class="w-6 h-6" />
        <span class="">Products</span>
      </NavItem>

      <NavItem to="/orders">
        <ClipboardDocumentListIcon class="w-6 h-6" />
        <span class="">Orders</span>
      </NavItem>
    </nav>

    <p class="text-secondary-soft text-xs">
      Made by <br>
      <a href="https://github.com/AbdAlrhman-Samy"
        target="_blank"
        class="text-main-soft hover:text-main hover:underline"
      >
        AbdAlrhman Samy
      </a>
    </p>

  </div>
</template>

<style scoped></style>