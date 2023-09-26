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
  <Menu as="button" v-slot="{ open }" class="lg:hidden">
    <MenuButton>
      <Bars4Icon
        class="h-14 w-14 rounded-bl rounded-br-xl rounded-tl-xl rounded-tr bg-light p-4 text-main ui-open:shadow-inner"
      />
    </MenuButton>

    <div v-show="open">
      <!-- Menu doesn't automatically close on Firefox, a bug within HeadlessUI -->
      <!-- https://github.com/tailwindlabs/headlessui/issues/2546 -->

      <MenuItems
        static
        class="absolute z-10 flex flex-col items-center justify-center gap-4 rounded-b-3xl rounded-tr-3xl bg-white px-8 py-4 shadow-lg"
      >
        <MenuItem v-for="route in routes" :key="route.name" v-slot="{ close }">
          <RouterLink
            @click="close"
            class="font-semibold"
            :class="{
              'text-main': $route.path === route.path,
              'text-secondary-soft': $route.path !== route.path
            }"
            :to="route.path"
          >
            {{ route.name }}
          </RouterLink>
        </MenuItem>
      </MenuItems>
    </div>
  </Menu>
</template>
