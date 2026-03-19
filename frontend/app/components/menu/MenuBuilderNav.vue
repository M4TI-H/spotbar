<script setup lang="ts">
const menuStore = useMenuStore();

const displayNav = ref<boolean>(false);

const buttons = [
  { name: "upload", label: "Upload & scan images", icon: "pi pi-images" },
  { name: "details", label: "Details & options", icon: "pi pi-align-left" },
  { name: "menu", label: "Modify menu items", icon: "pi pi-book" },
  { name: "layout", label: "Select layout", icon: "pi pi-objects-column" },
];
</script>

<template>
  <div
    class="w-full md:w-1/4 xl:w-1/5 p-4 lg:p-8 flex flex-col items-start gap-6 md:rounded-md border-b border-b-stone-700 md:border-0"
  >
    <div class="w-full flex items-center justify-between">
      <h1 class="text-stone-300 lg:text-lg font-semibold tracking-wider">
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
        class="text-sm cursor-pointer rounded-md w-full px-3 py-3 text-left flex items-center gap-3 transition-colors"
        :class="
          menuStore.selectedBuilderSection === button.name
            ? 'text-stone-300 bg-stone-600'
            : 'text-stone-400 hover:bg-stone-700 hover:text-stone-400/50 active:bg-stone-700 active:text-stone-400/50'
        "
      >
        <i :class="button.icon"></i>
        <span>{{ button.label }}</span>
      </button>
    </div>
    <div class="hidden md:flex w-full flex-col gap-2">
      <button
        v-for="(button, idx) in buttons"
        :key="idx"
        @click="menuStore.selectedBuilderSection = button.name"
        class="text-sm lg:text-base cursor-pointer w-full px-3 py-2 rounded-md text-left flex items-center gap-3 transition-colors"
        :class="
          menuStore.selectedBuilderSection === button.name
            ? 'text-stone-300 bg-stone-600  border-l-4 pl-4 border-emerald-600'
            : 'text-stone-500 hover:bg-stone-700 hover:text-stone-400 active:bg-stone-700 active:text-stone-400'
        "
      >
        <i :class="button.icon"></i>
        <span>{{ button.label }}</span>
      </button>
    </div>

    <div class="hidden md:flex flex-col w-full gap-2">
      <button
        class="text-sm lg:text-base cursor-pointer w-full px-3 py-2 gap-3 text-stone-400 bg-stone-700 hover:text-stone-300 hover:bg-stone-600 rounded-md transition-colors"
      >
        Save
      </button>
      <button
        class="text-sm lg:text-base cursor-pointer w-full px-3 py-2 gap-3 text-stone-300 bg-emerald-600 hover:bg-emerald-600/80 active:bg-emerald-600/80 rounded-md transition-colors"
      >
        Save and publish
      </button>
    </div>
  </div>
</template>
