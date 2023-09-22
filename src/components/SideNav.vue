<script setup lang="ts">
import {
  BuildingStorefrontIcon,
  HomeIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon
} from '@heroicons/vue/24/outline'
import NavItem from './NavItem.vue'
</script>

<template>
  <div class="hidden w-1/5 flex-col justify-between rounded-xl py-8 pl-8 lg:flex">
    <div class="flex flex-row items-center gap-4 text-main">
      <BuildingStorefrontIcon class="h-8 w-8" />
      <h2 class="cursor-default text-2xl font-bold">VueBoard</h2>
    </div>

    <nav class="flex w-full flex-col items-center gap-4">
      <NavItem to="/">
        <HomeIcon class="h-6 w-6" />
        <span class="">Home</span>
      </NavItem>

      <NavItem to="/users">
        <UserGroupIcon class="h-6 w-6" />
        <span class="">Users</span>
      </NavItem>

      <NavItem to="/products">
        <ShoppingCartIcon class="h-6 w-6" />
        <span class="">Products</span>
      </NavItem>

      <NavItem to="/orders">
        <ClipboardDocumentListIcon class="h-6 w-6" />
        <span class="">Orders</span>
      </NavItem>
    </nav>

    <p class="text-xs text-secondary-soft">
      Made by <br />
      <a
        href="https://github.com/AbdAlrhman-Samy"
        target="_blank"
        class="text-main-soft hover:text-main hover:underline"
      >
        AbdAlrhman Samy
      </a>
    </p>
  </div>
</template>

<style scoped></style>
