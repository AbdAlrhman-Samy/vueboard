<script lang="ts" setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/24/solid'
import { useNotificationsStore } from '../stores/notifications'
import { storeToRefs } from 'pinia'
import Button from './Button.vue'

const store = useNotificationsStore()

const { notifications } = storeToRefs(store)

const adjustedDate = (date: Date) => {
  const adjustedDate = new Date(date)
  const day = adjustedDate.getDate()
  const month = adjustedDate.getMonth() + 1
  const year = adjustedDate.getFullYear()
  const hours = adjustedDate.getHours().toString().padStart(2, '0')
  const minutes = adjustedDate.getMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}
</script>

<template>
  <Popover class="relative">
    <PopoverButton
      class="flex flex-row items-center rounded-bl rounded-br-xl rounded-tl-xl rounded-tr bg-light p-4 text-main hover:shadow-inner ui-open:shadow-inner md:relative"
    >
      <BellIcon class="h-6 w-6" />
      <span
        class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-main text-xs font-bold text-white outline outline-4 outline-white"
      >
        {{ store.notificationsCount }}
      </span>
    </PopoverButton>

    <PopoverPanel
      class="absolute z-10 flex w-64 flex-col gap-2 rounded-xl bg-white p-4 shadow-lg md:right-0 md:w-96"
    >
      <div
        v-if="!notifications.length"
        class="w-full whitespace-nowrap text-center font-bold text-main"
      >
        <span>¯\_(ツ)_/¯</span>
        <p>No Notifications</p>
      </div>

      <ul v-else class="flex max-h-96 w-full flex-col gap-2 overflow-auto">
        <li
          v-for="notif in notifications"
          :key="notif.id"
          class="flex flex-col rounded-br-xl rounded-tl-xl bg-light p-4 text-sm"
        >
          <div class="whitespace-nowrap text-xs font-semibold text-gray-400">
            {{ adjustedDate(notif.date) }}
          </div>
          <p class="font-bold text-main">
            {{ notif.text }}
          </p>
          <Button
            variant="secondary"
            class="ml-auto mt-2"
            title="✓"
            @click="store.removeNotification(notif.id)"
          />
        </li>
      </ul>

      <Button v-if="notifications.length" full title="Mark all as read" @click="store.$reset()" />
    </PopoverPanel>
  </Popover>
</template>
