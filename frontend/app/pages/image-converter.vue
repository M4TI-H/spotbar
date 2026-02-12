<script setup lang="ts">
import FileSelect from "~/components/imageConverter/FileSelect.vue";
import ProcessingLoading from "~/components/imageConverter/ProcessingLoading.vue";
import Menu from "~/components/menu/Menu.vue";
import type MenuItem from "~/models/MenuItem";

const menuItemsData = ref<MenuItem[]>();
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
    menuItemsData.value = response.data;

    console.log("Otrzymane menu:", menuItemsData.value);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="w-full min-h-screen flex gap-4 px-4">
    <FileSelect @upload="uploadPhotos" />

    <Menu v-if="menuItemsData" :menuItemsData="menuItemsData" />
    <ProcessingLoading v-if="isProcessing" />
  </div>
</template>
