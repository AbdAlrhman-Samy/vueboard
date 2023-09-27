<script lang="ts" setup>
import Button from '@/components/Button.vue'
import Error from '@/components/Error.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import Modal from '@/components/Modal.vue'
import { useFetch } from '@/composables/useFetch'
import { useNotificationsStore } from '@/stores/notifications'
import { onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const id = route.params.id

const isModalOpen = ref<boolean>(false)
const isDeleteLoading = ref<boolean>(false)
const isDeleted = ref<boolean>(false)

const notifStore = useNotificationsStore()

function setIsOpen(value: boolean) {
  isModalOpen.value = value
}

function redirect() {
  if (isDeleted.value) {
    router.push('/orders')
  } else setIsOpen(false)
}

// Looks ugly, should be refactored to its own composable maybe?
async function deleteOrder() {
  isDeleteLoading.value = true
  await fetch(`https://dummyjson.com/carts/${id}`, {
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
          text: `ORDERS: #${data.id} has been deleted.`,
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

const {
  data: order,
  isLoading,
  error,
  cancel
} = useFetch<Order>(`https://dummyjson.com/carts/${id}`)

onUnmounted(() => {
  cancel()
})

interface Order {
  id: number
  userId: number
  totalProducts: number
  totalQuantity: number
  total: number
  discountedTotal: number
  products: {
    id: number
    title: string
    price: number
    quantity: number
    total: number
    discountPercentage: number
    discountedPrice: number
  }[]
}
</script>

<template>
  <LoadingIndicator :isLoading="isLoading" />
  <Error :error="error" />

  <Modal v-if="order" :isOpen="isModalOpen" :setIsOpen="setIsOpen" :onClose="redirect">
    <!-- Delete Confirm Modal -->
    <template #title>
      <h1 class="text-2xl font-semibold text-main">Delete Product</h1>
    </template>

    <template #content>
      <p v-if="isDeleted" class="text-base text-main">
        <b>Order #{{ order.id }}</b> has been deleted successfully.
      </p>
      <p v-else class="text-base text-main">
        Are you sure you want to delete <b>Order #{{ order.id }}</b
        >? This action cannot be undone.
      </p>
    </template>

    <template #actions>
      <div class="flex justify-end gap-2">
        <Button v-if="!isDeleted" variant="secondary" @click="setIsOpen(false)" title="Close" />
        <Button
          v-if="!isDeleted"
          variant="danger"
          @click="deleteOrder"
          :title="isDeleteLoading ? 'Deleting...' : 'Delete'"
          :disabled="isDeleteLoading"
        />
        <router-link v-else to="/orders" class="w-fit">
          <Button title="Back To Orders" />
        </router-link>
      </div>
    </template>
  </Modal>

  <div v-if="order" class="flex flex-col gap-4">
    <!-- Order Summary Table -->
    <table class="table-auto">
      <caption class="mb-4 caption-top">
        <h2 class="text-2xl font-semibold text-main">
          Order #{{ order.id }}
          <br />
          <router-link
            class="text-base text-secondary underline"
            :to="{ name: 'user-details', params: { id: order.userId } }"
          >
            By User #{{ order.userId }}
          </router-link>
        </h2>
      </caption>

      <thead class="bg-light px-4 text-main">
        <tr>
          <th class="px-4 py-2 text-left">Product</th>
          <th class="px-4 py-2">Price</th>
          <th class="px-4 py-2">Quantity</th>
          <th class="px-4 py-2">Total</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in order.products" :key="product.id">
          <td class="border px-4 py-2 text-center">
            <router-link
              :to="{ name: 'product-details', params: { id: product.id } }"
              class="underline hover:text-main"
            >
              {{ product.title }}
            </router-link>
          </td>
          <td class="border px-4 py-2 text-center">{{ product.price }}</td>
          <td class="border px-4 py-2 text-center">{{ product.quantity }}</td>
          <td class="border px-4 py-2 text-center">{{ product.total }}</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td class="border border-none px-4 py-2"></td>
          <td class="border border-none px-4 py-2"></td>
          <td class="border px-4 py-2">
            Total: <b>{{ order.totalQuantity }}</b> item(s)
          </td>
          <td class="border px-4 py-2">
            Total: $<b>{{ order.total }}</b>
          </td>
        </tr>
      </tfoot>
    </table>

    <div class="flex justify-end gap-4">
      <Button @click="router.push({ name: 'orders' })" title="Back to Orders" />
      <Button title="Delete Order" variant="danger" @click="setIsOpen(true)" />
    </div>
  </div>
</template>
