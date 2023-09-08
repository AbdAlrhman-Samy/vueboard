<template>
  <Menu as="div" class="lg:hidden relative">

    <MenuButton>
      <Bars4Icon
        class="w-14 h-14 text-main bg-light p-4 hover:shadow rounded-tl-xl rounded-br-xl rounded-bl rounded-tr" />
    </MenuButton>

    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">

      <MenuItems
        class="flex flex-col items-center justify-center gap-4 bg-white rounded-b-3xl rounded-tr-3xl shadow-lg py-4 px-8 absolute z-10">

        <MenuItem v-for="route in routes" :key="route.name" v-slot="{ close }">
          <RouterLink @click="close"
            :class='{ "text-main font-semibold": $route.path === route.path, "text-secondary-soft": $route.path !== route.path }'
            :to="route.path">
            {{ route.name }}
          </RouterLink>
        </MenuItem>

      </MenuItems>

    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Bars4Icon } from '@heroicons/vue/24/solid';

const routes = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Products',
    path: '/products'
  },
  {
    name: 'Users',
    path: '/users'
  },
  {
    name: 'Orders',
    path: '/orders'
  },

]

</script>

<style scoped></style>