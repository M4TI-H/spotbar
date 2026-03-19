<script setup lang="ts">
import Warning from "~/components/modals/Warning.vue";

const menuItemStore = useMenuItemStore();
const modalStore = useModalStore();
</script>

<template>
  <div class="relative">
    <div class="md:p-1 bg-stone-900 min-h-screen">
      <slot />
    </div>

    <div
      v-if="modalStore.isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div class="absolute inset-0 bg-black/50" @click="modalStore.close"></div>

      <component
        :is="modalStore.component"
        v-bind="modalStore.props"
        @close="modalStore.close"
      />
    </div>
  </div>
</template>
