<script setup lang="ts">
const menuItemStore = useMenuItemStore();

defineProps<{
  section_id?: string;
}>();
</script>
<template>
  <button
    @click="menuItemStore.openEmptyForm(section_id)"
    class="shrink-0 w-fit px-3 py-2 hidden md:flex items-center justify-center gap-2 text-stone-300 bg-emerald-600 hover:bg-emerald-600/80 active:bg-emerald-600/80 rounded-md cursor-pointer transition-colors whitespace-nowrap"
  >
    <i class="pi pi-plus-circle"></i>
    <p>New item</p>
  </button>
</template>
