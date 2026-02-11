<script setup lang="ts">
import FileSelect from "~/components/imageConverter/FileSelect.vue";
import ProcessingLoading from "~/components/imageConverter/ProcessingLoading.vue";
import type MenuItem from "~/models/MenuItem";

const menuItemsData = ref<MenuItem[]>();
const isProcessing = ref<boolean>(false);
const categories = ref<string[]>();
const activeCategory = ref<string>("all");

const uploadPhotos = async (files: File[]) => {
  if (!files || files.length === 0) return;

  isProcessing.value = true;

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });

  try {
    const response = await $fetch<{ status: string; data: MenuItem[] }>(
      "http://127.0.0.1:8000/processor/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    isProcessing.value = false;
    menuItemsData.value = response.data;

    if (menuItemsData.value) {
      categories.value = Array.from(
        new Set(menuItemsData.value.map((item) => item.category)),
      ).filter(Boolean);
    }

    console.log("Otrzymane menu:", menuItemsData.value);
  } catch (error) {
    console.error(error);
  }
};

const filteredMenu = computed(() => {
  if (!menuItemsData.value) return [];

  if (activeCategory.value.toLowerCase() === "all") {
    return menuItemsData.value;
  }

  return menuItemsData.value.filter(
    (item) => item.category === activeCategory.value,
  );
});
</script>

<template>
  <div class="w-full min-h-screen flex gap-4 px-4">
    <FileSelect @upload="uploadPhotos" />
    <div
      v-if="menuItemsData"
      class="w-full max-w-[96vw] sm:max-w-md lg:max-w-3xl h-min flex flex-col p-4 gap-8 border border-gray-400 rounded-md"
    >
      <div class="w-full flex items-center gap-2">
        <button
          @click="activeCategory = 'all'"
          :class="
            activeCategory === 'all'
              ? 'bg-gray-400 text-white'
              : 'bg-transparent text-gray-600'
          "
          class="py-2 px-4 border border-gray-400 rounded-md"
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
              : 'bg-transparent text-gray-600'
          "
          class="py-2 px-4 border border-gray-400 rounded-md"
        >
          {{ cat }}
        </button>
      </div>
      <MenuItem v-for="(item, idx) in filteredMenu" :key="idx" :item="item" />
    </div>
    <ProcessingLoading v-if="isProcessing" />
  </div>
</template>
