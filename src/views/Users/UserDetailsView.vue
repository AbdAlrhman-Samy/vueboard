<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '../../composables/useFetch'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import Error from '@/components/Error.vue'
import Modal from '@/components/Modal.vue'
import Button from '@/components/Button.vue'
import { useNotificationsStore } from '@/stores/notifications'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const isModalOpen = ref<boolean>(false)
const isDeleteLoading = ref<boolean>(false)
const isDeleted = ref<boolean>(false)

const notifStore = useNotificationsStore()

// type <any> because the response is a huge object, and this page wasn't meant to stay anyway
const { data: user, error, isLoading, cancel } = useFetch<any>(`https://dummyjson.com/users/${id}`)

onUnmounted(() => {
  cancel()
})

watch(user, () => {
  if (user.value.message) {
    router.push('/404')
  }
})

async function deleteUser() {
  isDeleteLoading.value = true
  await fetch(`https://dummyjson.com/users/${id}`, {
    method: 'DELETE'
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      if (data.isDeleted) {
        isDeleted.value = true
        notifStore.addNotification({
          id: Math.floor(Math.random() * 1000),
          text: `USERS: ${data.firstName + ' ' + data.lastName} has been deleted.`,
          date: data.deletedOn
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isDeleteLoading.value = false
    })
}

function setIsOpen(value: boolean) {
  isModalOpen.value = value
  isDeleted.value = false
}

function redirect() {
  if (isDeleted.value) {
    router.push('/users')
  } else setIsOpen(false)
}
</script>

<template>
  <LoadingIndicator :isLoading="isLoading" />

  <Error :error="error" />

  <Modal :isOpen="isModalOpen" :setIsOpen="setIsOpen" :onClose="redirect">
    <template #title>
      <div class="flex items-center gap-2">
        <h1 class="text-2xl font-semibold text-main">Delete User</h1>
      </div>
    </template>

    <template #content>
      <p v-if="isDeleted" class="text-base text-main">User has been deleted successfully.</p>
      <p v-else class="text-base text-main">
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
    </template>

    <template #actions>
      <div class="flex justify-end gap-2">
        <Button v-if="!isDeleted" variant="secondary" @click="setIsOpen(false)" title="Close" />
        <Button
          v-if="!isDeleted"
          variant="danger"
          @click="deleteUser"
          :title="isDeleteLoading ? 'Deleting...' : 'Delete'"
          :disabled="isDeleteLoading"
        />
        <router-link v-else to="/users" class="w-fit">
          <Button title="Back To Users" />
        </router-link>
      </div>
    </template>
  </Modal>

  <pre
    v-if="user"
    class="my-2 h-full w-full max-w-6xl overflow-auto whitespace-pre rounded bg-bg-light p-2"
  >
      {{ user }}
    </pre
  >

  <div v-if="!isLoading && user" class="flex justify-end gap-4">
    <RouterLink to="/users" class="w-fit">
      <Button title="Back To Users" />
    </RouterLink>

    <Button title="Delete User" variant="danger" @click="setIsOpen(true)" />
  </div>
</template>
