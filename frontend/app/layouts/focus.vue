<script setup lang="ts">
const menuItemStore = useMenuItemStore();
</script>

<template>
  <div class="relative">
    <MenuItemForm v-if="menuItemStore.isOpened" />
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>
