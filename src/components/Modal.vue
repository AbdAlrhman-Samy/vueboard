<script lang="ts" setup>
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue'
import Button from './Button.vue'

const props = defineProps<{
  setIsOpen: (value: boolean) => void
  onClose?: () => void
  isOpen: boolean
}>()
</script>

<template>
  <Dialog
    :open="isOpen"
    @close="onClose"
    class="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-20"
  >
    <DialogPanel
      class="m-8 flex w-96 max-w-full flex-col justify-between gap-6 rounded-sm rounded-br-xl rounded-tl-xl bg-white p-4"
    >
      <div class="flex flex-col gap-2">
        <DialogTitle class="text-2xl font-semibold text-main">
          <slot name="title" />
        </DialogTitle>
        <DialogDescription class="text-sm text-secondary">
          <slot name="content" class="bg-main" />
        </DialogDescription>
      </div>

      <slot name="actions">
        <Button customClass="ml-auto" @click="setIsOpen(false)" title="Close" />
      </slot>
    </DialogPanel>
  </Dialog>
</template>
