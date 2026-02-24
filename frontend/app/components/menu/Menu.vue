<script setup lang="ts">
import type MenuItem from "~/models/MenuItem";

const menuStore = useMenuStore();
const menuItemStore = useMenuItemStore();

const activeCategory = ref<string>("all");

const categories = computed(() => {
  const sections = menuStore.menu.map((item) => item.section || "Inne");
  const unique = [...new Set(sections)];
  return unique.filter((c) => c.toLowerCase() !== "all");
});

const filteredMenu = computed(() => {
  const data = menuStore.menu;
  if (!data) return [];

  if (activeCategory.value.toLowerCase() === "all") {
    return data;
  }

  return data.filter(
    (item) =>
      (item.section || "").toLowerCase() === activeCategory.value.toLowerCase(),
  );
});

const groupedMenu = computed(() => {
  const groups: Record<string, MenuItem[]> = {};

  filteredMenu.value.forEach((item) => {
    const sectionName = item.section || "Inne";
    if (!groups[sectionName]) {
      groups[sectionName] = [];
    }
    groups[sectionName].push(item);
  });

  return groups;
});
</script>
<template>
  <div
    v-if="menuStore.menu"
    class="w-full h-min flex flex-col px-4 py-3 gap-4 border border-gray-300 rounded-md"
  >
    <div class="w-full flex items-center overflow-x-auto pb-2">
      <button
        @click="activeCategory = 'all'"
        class="relative px-4 pb-1 text-gray-600 whitespace-nowrap cursor-pointer"
      >
        All items
        <span
          v-if="activeCategory === 'all'"
          class="absolute bottom-0 left-0 w-full h-px bg-gray-600"
        ></span>
      </button>
      <button
        v-for="(cat, idx) in categories"
        :key="idx"
        @click="activeCategory = cat"
        class="relative px-4 pb-1 text-gray-600 whitespace-nowrap cursor-pointer"
      >
        {{ cat }}
        <span
          v-if="activeCategory === cat"
          class="absolute bottom-0 left-0 w-full h-px bg-gray-600"
        ></span>
      </button>
    </div>

    <div class="flex flex-col gap-10">
      <div
        v-for="(items, sectionName) in groupedMenu"
        :key="sectionName"
        class="flex flex-col gap-4"
      >
        <div class="flex items-center gap-4">
          <h3
            class="text-xl font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap"
          >
            {{ sectionName }}
          </h3>
          <div class="w-full h-px bg-gray-300"></div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <MenuItem v-for="(item, idx) in items" :key="idx" :item="item" />
        </div>
      </div>
    </div>

    <p v-if="filteredMenu.length === 0" class="text-center text-gray-400 py-10">
      No items found.
    </p>
  </div>
</template>
