<script setup lang="ts">
import type Section from "~/models/Section";

const menuStore = useMenuStore();
const modalStore = useModalStore();
const newSection = ref<Section | null>(null);

const positionOptions = computed(() => {
  const options = [{ label: "At the top", value: 1 }];

  menuStore.sections.forEach((s) => {
    options.push({
      label: `After ${s.name}`,
      value: s.position + 1,
    });
  });

  return options;
});

const handleSubmit = () => {
  if (!newSection.value || !newSection.value.name?.trim()) return;
  menuStore.addSection(newSection.value);

  newSection.value = null;
  modalStore.close();
  console.log(menuStore.sections);
};

onMounted(() => {
  newSection.value = {
    id: "",
    name: "",
    menu_id: "c0abaea2-5328-4ffd-9301-3697e45e3ced", //set menu onMounted
    description: "",
    position: 999,
  };
});
</script>
<template>
  <div v-if="newSection" class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold text-gray-800">
        Add section to the menu
      </h1>
      <button
        @click="modalStore.close()"
        class="hover:bg-gray-100 px-1 rounded-md transition-colors cursor-pointer"
      >
        <i class="pi pi-times text-gray-400 text-sm"></i>
      </button>
    </div>
    <div class="flex flex-col gap-2">
      <input
        v-model="newSection.name"
        type="text"
        placeholder="Section name"
        class="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm font-semibold placeholder:font-normal"
      />
      <textarea
        v-model="newSection.description"
        placeholder="Section description"
        class="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all h-16 text-sm resize-none"
      ></textarea>
    </div>
    <div class="w-full flex items-center justify-between pl-2">
      <p class="text-sm text-gray-500">Select position:</p>
      <select
        v-model="newSection.position"
        class="pl-2 pr-4 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm"
      >
        <option
          v-for="opt in positionOptions"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>
    <div class="flex items-center justify-between gap-4 self-end">
      <button
        @click="modalStore.close()"
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
