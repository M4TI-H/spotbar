<script setup lang="ts">
const menuItemStore = useMenuItemStore();
const modalStore = useModalStore();
</script>

<template>
  <div class="relative">
    <MenuItemForm v-if="menuItemStore.isOpened" />
    <div class="p-4">
      <slot />
    </div>
    <div
      v-if="modalStore.isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div class="absolute inset-0 bg-black/50" @click="modalStore.close"></div>
      <div
        class="relative w-full max-w-lg flex flex-col bg-white rounded-md overflow-hidden p-4"
      >
        <component
          :is="modalStore.component"
          v-bind="modalStore.props"
          @close="modalStore.close"
        />
      </div>
    </div>
  </div>
</template>
