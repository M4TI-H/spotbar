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
    class="relative px-2 pb-1 text-gray-600 rounded-md hover:bg-gray-100 font-semibold whitespace-nowrap cursor-pointer mr-2 transition-colors"
  >
    +
  </button>
</template>
