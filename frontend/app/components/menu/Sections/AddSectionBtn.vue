<script setup lang="ts">
import SectionForm from "~/components/modals/SectionForm.vue";

const modalStore = useModalStore();

const handleAddSectionClick = () => {
  modalStore.open(SectionForm, {
    menuId: "c0abaea2-5328-4ffd-9301-3697e45e3ced",
    currentPosition: 5,
  });
};
</script>

<template>
  <button
    @click="handleAddSectionClick"
    class="relative px-3 py-3 md:py-2 flex items-center gap-2 text-stone-300 bg-emerald-600 hover:bg-emerald-600/80 active:bg-emerald-600/80 rounded-md whitespace-nowrap cursor-pointer transition-colors"
  >
    <i class="pi pi-plus-circle text-lg md:text-base"></i>
    <span class="hidden md:flex">New section</span>
  </button>
</template>
