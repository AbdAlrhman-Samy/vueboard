<script lang="ts" setup>
import { onUnmounted, ref, computed } from 'vue'
import { useFetch } from '@/composables/useFetch'
import { useRoute, useRouter } from 'vue-router'
import { StarIcon } from '@heroicons/vue/24/outline'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'

const selectedImage = ref<string>('')
const isModalOpen = ref<boolean>(false)
const isDeleteLoading = ref<boolean>(false)
const isDeleted = ref<boolean>(false)

const router = useRouter()
const route = useRoute()

const id = route.params.id

const { data, isLoading, error, cancel } = useFetch<Product>(
  `https://dummyjson.com/products/${id}`
)

onUnmounted(() => {
  if (isLoading.value) cancel()
})

const initialImage = computed(() => data.value?.images[0] || '')

function setIsOpen(value: boolean) {
  isModalOpen.value = value
}

function redirect() {
  if (isDeleted.value) {
    router.push('/products')
  } else setIsOpen(false)
}

async function deleteProduct() {
  isDeleteLoading.value = true
  await fetch(`https://dummyjson.com/products/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      if (data.isDeleted) isDeleted.value = true
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isDeleteLoading.value = false
    })
}

interface Product {
  id: string
  title: string
  brand: string
  price: number
  discountPercentage: number
  description: string
  image: string
  category: string
  stock: number
  rating: number
  images: string[]
}
</script>

<template>
  <Modal :isOpen="isModalOpen" :setIsOpen="setIsOpen" :onClose="redirect">
    <!-- Delete Confirm Modal -->
    <template #title>
      <h1 class="text-2xl font-semibold text-main">Delete Product</h1>
    </template>

    <template #content>
      <p v-if="isDeleted" class="text-main text-base">
        <b>{{ data?.title }}</b> has been deleted successfully.
      </p>
      <p v-else class="text-main text-base">
        Are you sure you want to delete <b>{{ data?.title }}</b>? This action cannot be undone.
      </p>
    </template>

    <template #actions>
      <div class="flex gap-2 justify-end">
        <Button v-if="!isDeleted" variant="secondary" @click="setIsOpen(false)" title="Close" />
        <Button v-if="!isDeleted" variant="danger" @click="deleteProduct" :title="isDeleteLoading? 'Deleting...' : 'Delete'" :disabled="isDeleteLoading" />
        <router-link v-else to="/products" class="w-fit">
          <Button title="Back To Products" />
        </router-link>
      </div>
    </template>
  </Modal>

  <LoadingIndicator :isLoading="isLoading" />


  <!-- Product Data -->
  <div v-if="data && !isLoading" class="flex h-full flex-col items-center justify-between gap-4 lg:flex-row">
    <div class="flex flex-col lg:w-2/5 gap-4 w-full">
      <hgroup>
        <p class="text-base font-semibold text-secondary">{{ data.category }} / {{ data.brand }}</p>
        <h1 class="text-2xl font-semibold text-main">{{ data.title }}</h1>
        <p class="text-base font-semibold text-secondary">
          {{ data.description }}
        </p>
      </hgroup>

      <div class="mt-4 flex flex-row items-center gap-8">
        <span class="text-2xl font-semibold text-main"> ${{ data.price }} </span>
        <span class="text-lg font-semibold text-secondary line-through">
          ${{ data.price + data.price * (data.discountPercentage / 100) }}
        </span>
      </div>

      <div class="mt-4 flex flex-row items-center gap-4">
        <div class="flex flex-row items-center gap-2">
          <StarIcon class="h-6 w-6 text-main" />
          <span class="font-semibold text-main">{{ data.rating }}</span>
        </div>
        <span class="font-semibold text-main"> {{ data.stock }} in stock </span>
      </div>


      <div class="flex flex-row items-center gap-2 w-full overflow-auto">
        <Button title="Delete Product" full variant="danger" @click="setIsOpen(true)" />
        <Button title="Edit Product" full disabled />
        <RouterLink to="/products">
          <Button title="Back" full variant="secondary" />
        </RouterLink>
      </div>

    </div>

    <div class="flex w-full flex-col items-center justify-center gap-4 lg:w-1/2">
      <img :src="selectedImage ? selectedImage : initialImage" alt="Product Image"
        class="h-96 w-full rounded-xl border-2 border-main object-contain" />

      <div class="flex flex-row items-center gap-4 w-full overflow-auto lg:justify-center">
        <img v-for="(image, index) in data.images" :key="index" :src="image" @click="selectedImage = image"
          alt="Product Image"
          class="h-16 w-16 cursor-pointer rounded-lg border-2 object-cover shadow-lg hover:border-main hover:shadow-xl"
          :class="selectedImage === image ? 'border-main shadow-xl' : 'border-transparent'" />
      </div>
    </div>
  </div>
</template>
