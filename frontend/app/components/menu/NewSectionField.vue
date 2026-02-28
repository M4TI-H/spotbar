<script setup lang="ts">
import type Section from "~/models/Section";

const menuStore = useMenuStore();

const isEdited = ref<boolean>(false);
const newSection = ref<Section | null>(null);

const startEditing = () => {
  newSection.value = {
    id: "",
    name: "",
    menu_id: "c0abaea2-5328-4ffd-9301-3697e45e3ced", //set menu onMounted
    description: "",
    position: 999,
  };
  isEdited.value = true;
};

const handleSubmit = () => {
  if (!newSection.value || !newSection.value.name?.trim()) return;

  menuStore.addSection(newSection.value);

  isEdited.value = false;
  newSection.value = null;

  console.log(menuStore.sections);
};
</script>
<template>
  <template v-if="!isEdited">
    <div class="flex items-center gap-4">
      <button
        @click="startEditing"
        class="font-semibold text-sm text-gray-400 flex items-center gap-2 w-38 cursor-pointer hover:text-gray-500 transition-colors whitespace-nowrap"
      >
        <span>+</span>Add new section
      </button>
      <div class="w-full h-px bg-gray-300"></div>
    </div>
  </template>
  <template v-else-if="newSection">
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-4">
        <input
          v-model="newSection.name"
          type="text"
          placeholder="Section name"
          class="w-md px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all font-semibold placeholder:font-normal"
        />
        <div class="w-full h-px bg-gray-300"></div>
      </div>
      <textarea
        v-model="newSection.description"
        placeholder="Section description"
        class="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all h-16 text-sm resize-none"
      ></textarea>
      <div class="flex items-center justify-between gap-4 self-end px-4">
        <button
          @click="isEdited = false"
          class="hover:bg-gray-100 text-gray-400 text-sm py-2 px-3 rounded-md transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="w-full py-2 px-3 text-sm text-emerald-500 rounded-md bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 cursor-pointer transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  </template>
</template>
