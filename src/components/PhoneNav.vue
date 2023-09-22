<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Bars4Icon } from '@heroicons/vue/24/solid'

const routes = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Users',
    path: '/users'
  },
  {
    name: 'Products',
    path: '/products'
  },
  {
    name: 'Orders',
    path: '/orders'
  }
]
</script>

<template>
  <Menu as="div" class="relative lg:hidden">
    <MenuButton>
      <Bars4Icon
        class="h-14 w-14 rounded-bl rounded-br-xl rounded-tl-xl rounded-tr bg-light p-4 text-main hover:shadow"
      />
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute z-10 flex flex-col items-center justify-center gap-4 rounded-b-3xl rounded-tr-3xl bg-white px-8 py-4 shadow-lg"
      >
        <MenuItem v-for="route in routes" :key="route.name" v-slot="{ close }">
          <RouterLink
            @click="close"
            :class="{
              'font-semibold text-main': $route.path === route.path,
              'text-secondary-soft': $route.path !== route.path
            }"
            :to="route.path"
          >
            {{ route.name }}
          </RouterLink>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style scoped></style>
