<script setup lang="ts">
import MenuItemForm from "~/components/menu/MenuItemForm.vue";
import Navigation from "~/components/Navigation.vue";

const menuItemStore = useMenuItemStore();
</script>

<template>
  <div class="relative">
    <Navigation />
    <MenuItemForm v-if="menuItemStore.isOpened" />
    <div class="p-4 sm:px-12 bg-neutral-100">
      <slot />
    </div>
  </div>
</template>
