<script setup lang="ts">
import Menu from "~/components/menu/Menu.vue";

definePageMeta({
  layout: "focus",
});

const menuStore = useMenuStore();
</script>

<template>
  <div class="w-full flex items-start gap-4">
    <MenuOptionPanel />
    <Menu />
    <div
      class="w-full max-w-xs px-4 py-3 flex flex-col gap-4 rounded-md border border-gray-300"
    >
      <button
        class="w-full py-2 text-sm text-gray-500 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors"
      >
        Preview
      </button>
      <div class="w-full flex items-center gap-2">
        <button
          class="px-6 py-2 text-sm text-red-500 rounded-md bg-red-100 border border-red-300 hover:bg-red-200 cursor-pointer transition-colors"
        >
          Discard
        </button>
        <button
          class="w-full py-2 text-sm text-emerald-500 rounded-md bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 cursor-pointer transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
