<script setup lang="ts">
import SectionForm from "~/components/modals/SectionForm.vue";
import type MenuItem from "~/models/MenuItem";
import type Section from "~/models/Section";
import NewItemButton from "../NewItemButton.vue";

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
  <div class="flex flex-col mb-4">
    <div class="flex items-center justify-between gap-2 pr-2">
      <h1
        @click="handleOpenSectionForm"
        class="min-w-fit sm:text-lg md:text-xl font-bold text-stone-300 uppercase truncate tracking-wider cursor-pointer hover:bg-stone-900/30 active:bg-stone-900/30 p-2 md:px-4 rounded-md transition-colors flex-1"
      >
        {{ section.name }}
      </h1>

      <div class="hidden md:flex w-full h-0.5 bg-stone-700"></div>

      <div class="shrink-0">
        <NewItemButton :section_id="section.id" />
      </div>
    </div>

    <p
      v-if="section.description"
      class="text-sm md:text-base text-stone-500 px-4 md:px-8 leading-relaxed italic"
    >
      {{ section.description }}
    </p>
  </div>

  <div class="grid grid-cols-1 gap-4 px-2">
    <MenuItem
      v-for="item in section.items"
      :key="item.id"
      :item="item"
      :sectionLength="section.items.length"
    />

    <div
      v-if="section.items.length === 0"
      class="flex items-center justify-center flex-col py-10 border-2 border-dashed border-stone-800 rounded-2xl"
    >
      <i class="pi pi-inbox text-stone-600 text-3xl mb-3"></i>
      <p class="text-stone-500 text-sm font-medium">No items in this section</p>
    </div>
  </div>
</template>
