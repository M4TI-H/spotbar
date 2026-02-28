<script setup lang="ts">
import NewSectionField from "./NewSectionField.vue";
import NewProductField from "./NewProductField.vue";
import AddSectionBtn from "./Sections/AddSectionBtn.vue";

const menuStore = useMenuStore();

const activeSection = ref<string>("all");
const { sections } = storeToRefs(menuStore);

const sectionList = computed(() => {
  return [...sections.value]
    .sort((a, b) => a.position - b.position)
    .filter((s) => s.name.toLowerCase() !== "all");
});

const filteredMenu = computed(() => {
  const data = menuStore.menuItems;
  if (!data) return [];

  if (activeSection.value.toLowerCase() === "all") {
    return data;
  }

  return data.filter(
    (item) =>
      (item.section_id || "").toLowerCase() ===
      activeSection.value.toLowerCase(),
  );
});

const groupedMenu = computed(() => {
  return sections.value
    .sort((a, b) => a.position - b.position)
    .filter((section) => {
      return (
        activeSection.value === "all" || activeSection.value === section.id
      );
    })
    .map((section) => {
      return {
        ...section,
        items: menuStore.menuItems.filter(
          (item) => item.section_id === section.id,
        ),
      };
    });
});
</script>
<template>
  <div
    v-if="menuStore.menuItems"
    class="w-full h-min flex flex-col px-4 pt-3 pb-5 gap-4 border border-gray-300 rounded-md"
  >
    <div class="w-full flex items-center overflow-x-auto pb-2">
      <AddSectionBtn />
      <button
        @click="activeSection = 'all'"
        class="relative px-4 pb-1 text-gray-600 whitespace-nowrap cursor-pointer"
      >
        All items
        <span
          v-if="activeSection === 'all'"
          class="absolute bottom-0 left-0 w-full h-px bg-gray-600"
        ></span>
      </button>
      <button
        v-for="(sect, idx) in sectionList"
        :key="idx"
        @click="activeSection = sect.id"
        class="relative px-4 pb-1 text-gray-600 whitespace-nowrap cursor-pointer"
      >
        {{ sect.name }}
        <span
          v-if="activeSection === sect.id"
          class="absolute bottom-0 left-0 w-full h-px bg-gray-600"
        ></span>
      </button>
    </div>

    <div class="flex flex-col gap-4">
      <div
        v-for="section in groupedMenu"
        :key="section.id"
        class="flex flex-col"
      >
        <div class="flex items-center gap-4">
          <h3
            class="text-xl font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap"
          >
            {{ section.name }}
          </h3>
          <div class="w-full h-px bg-gray-300"></div>
        </div>
        <p class="text-sm text-gray-400 px-1">{{ section.description }}</p>
        <div class="grid grid-cols-1 gap-4 mt-2">
          <MenuItem v-for="item in section.items" :key="item.id" :item="item" />
        </div>
        <NewProductField />
      </div>
    </div>
    <NewSectionField />

    <p v-if="filteredMenu.length === 0" class="text-center text-gray-400 py-10">
      No items found.
    </p>
  </div>
</template>
