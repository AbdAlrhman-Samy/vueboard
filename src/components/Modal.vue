<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'
import Button from './Button.vue';

const props = defineProps<{
  setIsOpen: (value: boolean) => void
  onClose?: () => void
  isOpen: boolean
}>()

</script>

<template>
  <Dialog :open="isOpen" @close="onClose" 
    class="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-20 flex justify-center items-center">
    
    <DialogPanel class="flex flex-col justify-between bg-white w-96 gap-6 p-4 rounded-tl-xl rounded-br-xl rounded-sm max-w-full m-8">

      <div class="flex flex-col gap-2">
        <DialogTitle class="font-semibold text-2xl text-main">
          <slot name="title" />
        </DialogTitle>
        <DialogDescription class="text-sm text-secondary">
          <slot name="content" class="bg-main" />
        </DialogDescription>
      </div>

      <slot name="actions">
        <Button
          customClass="ml-auto"
          @click="setIsOpen(false)"
          title="Close"
        />
      </slot>

    </DialogPanel>
  </Dialog>

</template>
