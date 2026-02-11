<script setup lang="ts">
import type ImagePreview from "~/models/ImagePreview";

const expand = ref<boolean>(false);
const previews = ref<ImagePreview[]>([]);
const isUploading = ref<boolean>(false);
const uploadProgress = ref<number>(0);
const files = ref<File[] | null>(null);

const emit = defineEmits<{
  (e: "upload", value: File[]): void;
}>();

const handleUploadPreview = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const fileList = target.files;

  if (!fileList || fileList.length === 0) return;

  const newFiles = Array.from(fileList);

  if (!files.value) {
    files.value = newFiles;
  } else {
    files.value = [...files.value, ...newFiles];
  }

  isUploading.value = true;
  uploadProgress.value = 0;

  for (let i = 0; i < newFiles.length; i++) {
    const file = newFiles[i];

    if (!file) continue;

    await new Promise((resolve) => setTimeout(resolve, 100));

    const newImg: ImagePreview = {
      file: file,
      url: URL.createObjectURL(file),
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
  if (files.value) {
    const validFiles = files.value.filter((f): f is File => f !== undefined);
    emit("upload", validFiles);
  }
};

onUnmounted(() => {
  previews.value.forEach((img) => URL.revokeObjectURL(img.url));
});
</script>
<template>
  <section
    :class="expand ? 'max-h-fit' : 'max-h-min'"
    class="relative w-full max-w-md flex flex-col p-4 gap-4 bg-gray-200 border border-gray-300 rounded-md overflow-hidden transition-all duration-100 ease-in-out"
  >
    <div class="flex flex-col gap-1">
      <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Menu Scanner</h2>
      <p class="text-sm sm:text-base text-gray-400">
        Upload photos to create a digital version
      </p>
    </div>
    <label
      class="flex items-center justify-center w-full py-2 sm:py-3 bg-gray-300 rounded-sm select-none hover:bg-gray-400/40 cursor-pointer transition-colors duration-200"
    >
      <input
        type="file"
        multiple
        @change="handleUploadPreview"
        class="hidden"
        accept="image/*"
      />
      <p class="text-sm text-gray-500">Upload</p>
    </label>
    <div class="flex flex-col gap-1">
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
        class="flex items-center justify-center w-full py-2 sm:py-3 text-sm text-gray-200 bg-gray-500 rounded-sm select-none hover:bg-gray-600/90 cursor-pointer transition-colors duration-200"
      >
        Convert to text
      </button>
      <p v-if="previews.length > 0" class="text-sm text-gray-400 self-end mr-1">
        Selected images: {{ previews.length }}
      </p>
    </div>

    <template v-if="previews.length > 0">
      <div
        :class="expand ? 'overflow-auto' : 'overflow-hidden'"
        class="w-full grid grid-cols-2 sm:grid-cols-3 gap-2"
      >
        <img
          v-for="(img, idx) in previews"
          :key="idx"
          :src="img.url"
          draggable="false"
          class="h-full object-cover"
        />
      </div>
      <div
        v-if="previews.length > 0 && !expand"
        class="absolute bottom-0 left-0 flex items-end justify-center p-1 w-full h-32 bg-linear-to-t from-gray-200 via-gray-200/90 to-transparent"
      >
        <button
          @click="expand = true"
          class="text-sm text-gray-400 hover:text-gray-500 transition-colors duration-200 cursor-pointer"
        >
          Show all
        </button>
      </div>
    </template>

    <button
      v-if="expand"
      @click="expand = false"
      class="text-sm text-gray-400 hover:text-gray-500 transition-colors duration-200 cursor-pointer"
    >
      Show less
    </button>
  </section>
</template>
