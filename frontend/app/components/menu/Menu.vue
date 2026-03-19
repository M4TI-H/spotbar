<script setup lang="ts">
import { CascadeSelect } from "primevue";
import NewSectionField from "./NewSectionField.vue";
import AddSectionBtn from "./Sections/AddSectionBtn.vue";
import Section from "./Sections/Section.vue";

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
        items: menuStore.menuItems
          .sort((a, b) => a.position - b.position)
          .filter((item) => item.section_id === section.id),
      };
    });
});
</script>
<template>
  <div
    v-if="menuStore.menuItems"
    class="w-full h-min flex flex-col md:px-2 gap-4"
  >
    <div class="w-full flex items-center overflow-x-auto pb-2 gap-4 md:gap-2">
      <AddSectionBtn />
      <div class="py-6 md:py-4 w-px bg-stone-400"></div>
      <div
        class="scrollbar-hide w-full flex items-center overflow-x-auto whitespace-nowrap gap-2"
      >
        <button
          @click="activeSection = 'all'"
          class="relative px-4 py-2 md:py-2 text-lg md:text-base rounded-md whitespace-nowrap cursor-pointer transition-colors"
          :class="[
            activeSection === 'all'
              ? 'text-stone-300 bg-stone-600 hover:bg-stone-600/80'
              : 'text-stone-500 hover:bg-stone-700 hover:text-stone-400 active:bg-stone-700 active:text-stone-400',
          ]"
        >
          All sections
        </button>
        <button
          v-for="(sect, idx) in sectionList"
          :key="idx"
          @click="activeSection = sect.id"
          class="relative px-4 py-2 md:py-2 text-lg md:text-base rounded-md whitespace-nowrap cursor-pointer transition-colors"
          :class="[
            activeSection === sect.id
              ? 'text-stone-300 bg-stone-600 hover:bg-stone-600/80'
              : 'text-stone-500 hover:bg-stone-700 hover:text-stone-400 active:bg-stone-700 active:text-stone-400',
          ]"
        >
          {{ sect.name }}
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-4 overflow-y-auto">
      <div
        v-for="section in groupedMenu"
        :key="section.id"
        class="flex flex-col"
      >
        <Section :section="section" />
      </div>
    </div>
    <!-- <NewSectionField v-if="activeSection === 'all'" /> -->

    <p
      v-if="menuStore.sections.length == 0"
      class="text-center text-stone-400 py-10"
    >
      No items found.
    </p>
  </div>
</template>
