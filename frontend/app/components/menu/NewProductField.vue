<script setup lang="ts">
const menuItemStore = useMenuItemStore();
</script>
<template>
  <div class="w-full flex items-center ml-2 gap-4">
    <button
      @click="menuItemStore.openEmpty()"
      class="font-semibold text-sm text-gray-400 flex items-center gap-2 cursor-pointer hover:text-gray-500 transition-colors whitespace-nowrap"
    >
      <span>+</span>Add new product to menu
    </button>
  </div>
</template>
