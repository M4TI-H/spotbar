<script setup lang="ts">
import SectionForm from "~/components/modals/SectionForm.vue";
import type MenuItem from "~/models/MenuItem";
import type Section from "~/models/Section";
import NewItemField from "../NewItemField.vue";

const modalStore = useModalStore();

const props = defineProps<{
  section: Section & { items: MenuItem[] };
}>();

const handleOpenSectionForm = () => {
  modalStore.open(SectionForm, {
    data: {
      id: props.section.id,
      name: props.section.name,
      description: props.section.description,
      position: props.section.position,
      menu_id: props.section.menu_id,
    },
  });
};
</script>
<template>
  <div class="flex items-center gap-4 pr-2">
    <button
      @click="handleOpenSectionForm"
      class="text-xl font-bold flex items-center gap-2 text-gray-700 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:bg-gray-100 px-2 rounded-md group transi"
    >
      {{ section.name }}
      <span class="hidden text-sm group-hover:inline text-gray-700"
        ><i class="pi pi-pencil"></i
      ></span>
    </button>
    <div class="w-full h-px bg-gray-300"></div>
    <NewItemField />
  </div>
  <p class="text-sm text-gray-400 px-3">{{ section.description }}</p>
  <div class="grid grid-cols-1 gap-4 mt-2 px-2">
    <MenuItem v-for="item in section.items" :key="item.id" :item="item" />
  </div>
</template>
