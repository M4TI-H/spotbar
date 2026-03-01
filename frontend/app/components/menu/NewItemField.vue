<script setup lang="ts">
const menuItemStore = useMenuItemStore();
</script>
<template>
  <button
    @click="menuItemStore.openEmpty()"
    class="w-fit p-1 font-semibold text-sm text-gray-400 flex items-center gap-2 cursor-pointer rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
  >
    <span>+</span>Add new item
  </button>
</template>
