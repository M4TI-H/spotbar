<script setup lang="ts">
const menuStore = useMenuStore();

const displayNav = ref<boolean>(false);

const buttons = [
  { name: "upload", label: "Upload & scan images" },
  { name: "details", label: "Details & options" },
  { name: "menu", label: "Modify menu items" },
  { name: "layout", label: "Select layout" },
];
</script>

<template>
  <div
    class="w-full md:w-1/4 xl:w-1/5 p-4 md:p-8 flex flex-col items-start gap-6 md:rounded-md border-b border-b-stone-700"
  >
    <div class="w-full flex items-center justify-between">
      <h1
        class="text-stone-300 text-sm md:text-base font-semibold tracking-wider"
      >
        Creating new menu
      </h1>
      <button
        @click="displayNav = !displayNav"
        class="md:hidden rounded-md focus:bg-stone-700 p-1 flex items-center justify-center transition-colors duration-300"
      >
        <i
          class="text-stone-300"
          :class="displayNav ? 'pi pi-times' : 'pi pi-bars'"
        ></i>
      </button>
    </div>

    <div v-if="displayNav" class="w-full flex flex-col gap-1">
      <button
        v-for="(button, idx) in buttons"
        :key="idx"
        @click="menuStore.selectedBuilderSection = button.name"
        class="text-sm cursor-pointer rounded-md w-full px-3 py-3 text-left"
        :class="
          menuStore.selectedBuilderSection === button.name
            ? 'text-stone-300 bg-stone-600'
            : 'text-stone-500 hover:bg-stone-700 hover:text-stone-400 '
        "
      >
        {{ button.label }}
      </button>
    </div>
    <div class="hidden md:flex w-full flex-col gap-2">
      <button
        v-for="(button, idx) in buttons"
        :key="idx"
        @click="menuStore.selectedBuilderSection = button.name"
        class="text-md cursor-pointer rounded-md w-full px-3 py-2 text-left"
        :class="
          menuStore.selectedBuilderSection === button.name
            ? 'text-stone-300 bg-stone-600'
            : 'text-stone-500 hover:bg-stone-700 hover:text-stone-400 '
        "
      >
        {{ button.label }}
      </button>
    </div>
  </div>
</template>
