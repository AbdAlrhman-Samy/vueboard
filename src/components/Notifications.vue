<script lang="ts" setup>
import { BellIcon } from '@heroicons/vue/24/solid'
import { useNotificationsStore } from '../stores/notifications'
import { storeToRefs } from 'pinia'
import Button from './Button.vue'
import Modal from './Modal.vue'
import { ref } from 'vue'

const store = useNotificationsStore()

const { notifications } = storeToRefs(store)

const isModalOpen = ref<boolean>(false)

function setIsModalOpen(value: boolean) {
  isModalOpen.value = value
}

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
  <button
    @click="isModalOpen = true"
    class="relative flex flex-row items-center rounded-bl rounded-br-xl rounded-tl-xl rounded-tr bg-light p-4 text-main hover:shadow-inner ui-open:shadow-inner"
  >
    <BellIcon class="h-6 w-6" />
    <span
      class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-main text-xs font-bold text-white outline outline-4 outline-white"
    >
      {{ store.notificationsCount }}
    </span>
  </button>

  <Modal :isOpen="isModalOpen" :setIsOpen="setIsModalOpen" @close="setIsModalOpen(false)">
    <template v-slot:title>
      <h1 class="text-2xl font-semibold text-main">Notifications</h1>
    </template>

    <template v-slot:content>
      <h4
        v-if="!notifications.length"
        class="w-full whitespace-nowrap text-center text-2xl text-gray-300"
      >
        ¯\_(ツ)_/¯
      </h4>

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
    </template>

    <template v-slot:actions>
      <div class="flex flex-row justify-end gap-2">
        <Button variant="secondary" title="Close" @click="setIsModalOpen(false)" />
        <Button v-if="notifications.length" title="Mark all as read" @click="store.$reset()" />
      </div>
    </template>

  </Modal>
</template>
