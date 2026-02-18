<script setup lang="ts">
import type MenuItem from "~/models/MenuItem";

const menuStore = useMenuStore();
const menuItemStore = useMenuItemStore();

const activeCategory = ref<string>("all");
const availableCurrencies = ["PLN", "EUR", "USD", "GBP"];

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
    class="w-full max-w-[96vw] sm:max-w-md lg:max-w-4xl h-min flex flex-col p-4 gap-8 border border-gray-400 rounded-md"
  >
    <div class="w-full flex items-center gap-2 overflow-x-auto pb-2">
      <button
        @click="activeCategory = 'all'"
        :class="
          activeCategory === 'all'
            ? 'bg-gray-400 text-white'
            : 'bg-transparent text-gray-800'
        "
        class="py-2 px-4 border border-gray-400 rounded-md whitespace-nowrap cursor-pointer"
      >
        All
      </button>
      <button
        v-for="(cat, idx) in categories"
        :key="idx"
        @click="activeCategory = cat"
        :class="
          activeCategory === cat
            ? 'bg-gray-400 text-white'
            : 'bg-transparent text-gray-800'
        "
        class="py-2 px-4 border border-gray-400 rounded-md whitespace-nowrap cursor-pointer"
      >
        {{ cat }}
      </button>
    </div>
    <div class="w-full flex flex-col items-end gap-1">
      <select
        v-model="menuItemStore.defaultCurrency"
        class="w-min px-3 py-2 rounded-md border border-gray-300 focus:border-emerald-600 outline-0 bg-white"
      >
        <option v-for="curr in availableCurrencies" :key="curr" :value="curr">
          {{ curr }}
        </option>
      </select>
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
