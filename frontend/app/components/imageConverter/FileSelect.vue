<script setup lang="ts">
import { Divider } from "primevue";
import type ImagePreview from "~/models/ImagePreview";
import type MenuItem from "~/models/MenuItem";
import type Section from "~/models/Section";

const expand = ref<boolean>(false);
const previews = ref<ImagePreview[]>([]);
const isUploading = ref<boolean>(false);
const uploadProgress = ref<number>(0);

const menuStore = useMenuStore();
const isProcessing = ref<boolean>(false);

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
      category_id: "cat_01",
      name: "Legendary Brown Spirits Long Island",
      price: 99,
      position: 2,
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
      category_id: "cat_01",
      name: "Ultimate Negroni",
      price: 69,
      position: 1,
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
      category_id: "cat_01",
      name: "Gdańsk & Stormy",
      price: 43,
      position: 2,
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
      category_id: "cat_01",
      name: "Basil Gimlet",
      price: 42,
      position: 1,
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

//generates hash from image's content, used to prevent duplicates
const generateFileHash = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-1", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

//handles file select, generates previews and validates duplicates
const handleUploadPreview = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const fileList = target.files;

  if (!fileList || fileList.length === 0) return;

  const newFiles = Array.from(fileList);
  isUploading.value = true;
  uploadProgress.value = 0;

  for (let i = 0; i < newFiles.length; i++) {
    const file = newFiles[i];
    if (!file) continue;

    const fileHash = await generateFileHash(file);
    if (!fileHash) {
      console.error("Hash generation failed for", file.name);
      continue;
    }

    const isDuplicate = previews.value.some((p) => p.hash === fileHash);
    if (isDuplicate) {
      console.warn("Duplicate file detected: ", file.name);
      continue;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    const newImg: ImagePreview = {
      file: file,
      url: URL.createObjectURL(file),
      wasProcessed: false,
      hash: fileHash,
    };

    previews.value.push(newImg);
    uploadProgress.value = Math.round(((i + 1) / newFiles.length) * 100);
  }

  setTimeout(() => {
    isUploading.value = false;
    setTimeout(() => (uploadProgress.value = 0), 300);
  }, 800);
};

const handleEmitUpload = () => {
  const unprocessedPreviews = previews.value.filter((p) => !p.wasProcessed);

  if (unprocessedPreviews.length > 0) {
    const filesToUpload = unprocessedPreviews.map((p) => p.file);
    // uploadPhotos(filesToUpload);
    loadSampleMenu();
    unprocessedPreviews.forEach((p) => (p.wasProcessed = true));
  }
};

onUnmounted(() => {
  previews.value.forEach((img) => URL.revokeObjectURL(img.url));
});
</script>
<template>
  <div
    class="relative w-full flex flex-col gap-4 overflow-hidden transition-all duration-100 ease-in-out"
  >
    <div class="flex flex-col">
      <h1 class="md:text-xl text-stone-300 font-semibold tracking-wider">
        Image scanner
      </h1>
      <p class="text-sm sm:text-base text-stone-400">
        Upload photos to create a digital version
      </p>
    </div>
    <div class="w-full flex flex-col items-center gap-6">
      <div class="hidden md:flex items-center justify-center flex-col">
        <i
          class="pi pi-cloud-upload border-2 text-stone-400 border-emerald-500 rounded-xl p-8 text-4xl"
        ></i>
        <p class="mt-4 text-stone-400 text-sm">
          Drag and drop files here to upload.
        </p>
      </div>

      <p class="text-stone-600">Or</p>

      <label
        class="flex items-center justify-center w-full max-w-md py-2 border border-stone-700 rounded-md hover:border-emerald-500 hover:bg-stone-700 select-none cursor-pointer transition-colors"
      >
        <input
          type="file"
          multiple
          @change="handleUploadPreview"
          class="hidden"
          accept="image/*"
        />
        <p class="text-sm text-stone-400">Select files from device</p>
      </label>

      <div class="w-full max-w-md flex flex-col gap-1 mt-4">
        <div
          v-if="isUploading"
          class="w-full h-4 bg-gray-300 rounded-sm overflow-hidden text-[10px] flex items-center justify-center relative"
        >
          <div
            class="absolute left-0 top-0 h-full bg-emerald-400 transition-all duration-300 ease-out"
            :style="{ width: `${uploadProgress}%` }"
          ></div>
          <span v-if="isUploading" class="z-10 font-bold text-emerald-900">
            {{ uploadProgress }}%
          </span>
        </div>

        <button
          @click="handleEmitUpload"
          v-if="previews.length > 0"
          class="flex items-center justify-center w-full py-2 text-sm text-stone-300 bg-emerald-500 rounded-md select-none hover:bg-emerald-600 cursor-pointer transition-colors"
        >
          Convert to text
        </button>
        <p
          v-if="previews.length > 0"
          class="text-sm text-gray-400 self-end mr-1"
        >
          Selected images: {{ previews.length }}
        </p>
      </div>
    </div>

    <template v-if="previews.length > 0">
      <div
        :class="expand ? 'max-h-80 overflow-auto' : 'max-h-64 overflow-hidden'"
        class="w-full grid grid-cols-2 sm:grid-cols-3 gap-2"
      >
        <img
          v-for="(img, idx) in previews"
          :key="idx"
          :src="img.url"
          draggable="false"
          class="h-48 object-cover mx-auto"
        />
      </div>
      <div
        v-if="previews.length > 3 && !expand"
        class="absolute bottom-0 left-0 flex items-end justify-center p-1 w-full h-32 bg-linear-to-t from-gray-100 via-gray-100/90 to-transparent"
      >
        <button
          @click="expand = true"
          class="text-sm text-gray-300 hover:text-gray-400 transition-colors cursor-pointer"
        >
          Show all
        </button>
      </div>
    </template>

    <button
      v-if="expand"
      @click="expand = false"
      class="text-sm text-gray-300 hover:text-gray-400 transition-colors cursor-pointer"
    >
      Show less
    </button>
  </div>
</template>
