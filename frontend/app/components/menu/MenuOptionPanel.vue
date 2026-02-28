<script setup lang="ts">
import type MenuItem from "~/models/MenuItem";
import FileSelect from "../imageConverter/FileSelect.vue";
import type Section from "~/models/Section";

const menuStore = useMenuStore();
const isProcessing = ref<boolean>(false);

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
    menuStore.addToMenu(response.data);

    console.log("Otrzymane menu:", response.data);
  } catch (error) {
    console.error(error);
  }
};

const { defaultCurrency } = storeToRefs(menuStore);

const loadSampleMenu = async () => {
  isProcessing.value = true;

  const menuId = crypto.randomUUID();
  const sectionId1 = crypto.randomUUID();
  const sectionId2 = crypto.randomUUID();

  const sampleSections: Section[] = [
    {
      id: sectionId1,
      menu_id: menuId,
      name: "Luxury & Vintage Cocktails",
      description:
        "Exclusive spirits and rare ingredients from around the world.",
      position: 1,
    },
    {
      id: sectionId2,
      menu_id: menuId,
      name: "Reinvented Classics",
      description: "Your favorite classics with a modern, local twist.",
      position: 2,
    },
  ];

  const sampleItems: MenuItem[] = [
    {
      id: crypto.randomUUID(),
      section_id: sectionId1,
      category: "Cocktails",
      name: "Legendary Brown Spirits Long Island",
      price: 99,
      ingredients: [
        "Wild Turkey Rare Bread",
        "Remy Martin VSOP",
        "Casamigos Reposado",
        "Cola",
      ],
      description:
        "Extremely strong and sophisticated blend of premium spirits.",
      metadata: { hidden_attrs: [] },
    },
    {
      id: crypto.randomUUID(),
      section_id: sectionId1,
      category: "Cocktails",
      name: "Ultimate Negroni",
      price: 69,
      ingredients: [
        "Bareksten Botanical Gin",
        "Campari Cask Tale",
        "9Didante Vermouth",
      ],
      description: "Aged in oak barrels for extra smoothness.",
      metadata: { hidden_attrs: [] },
    },
    {
      id: crypto.randomUUID(),
      section_id: sectionId2,
      category: "Cocktails",
      name: "Gdańsk & Stormy",
      price: 43,
      ingredients: [
        "Angostura 5yo Rum",
        "Goldwasser",
        "Ginger Beer",
        "Citrus",
        "Smoke",
      ],
      description:
        "A tribute to the local history with a touch of gold flakes.",
      metadata: { hidden_attrs: [] },
    },
    {
      id: crypto.randomUUID(),
      section_id: sectionId2,
      category: "Cocktails",
      name: "Basil Gimlet",
      price: 42,
      ingredients: ["Citadelle Gin", "Basil", "Lime", "Lime leaves"],
      description: "Fresh, herbal and perfectly balanced sour.",
      metadata: { hidden_attrs: [] },
    },
  ];

  menuStore.setSections(sampleSections);
  menuStore.addToMenu(sampleItems);

  isProcessing.value = false;
  console.log("Sample data with UUIDs loaded successfully.");
};
</script>
<template>
  <div class="px-4 py-3 gap-4 flex flex-col rounded-md border border-gray-300">
    <h1 class="text-lg text-gray-900 font-semibold">New menu</h1>
    <div class="min-w-sm flex flex-col gap-2">
      <h2 class="text-lg text-gray-600 font-semibold">Menu options</h2>
      <input
        type="text"
        placeholder="Menu name"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm"
      />
      <textarea
        placeholder="Menu description"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all h-20 text-sm resize-none"
      ></textarea>
      <div class="w-full flex items-center justify-between pl-1">
        <p class="text-sm text-gray-500">Default currency:</p>
        <select
          v-model="defaultCurrency"
          class="pl-1 pr-5 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm"
        >
          <option value="PLN" selected>PLN (zł)</option>
          <option value="GBP">GBP (£)</option>
          <option value="EUR">EUR (€)</option>
          <option value="USD">USD ($)</option>
        </select>
      </div>
    </div>
    <FileSelect @upload="loadSampleMenu" />
  </div>
</template>
