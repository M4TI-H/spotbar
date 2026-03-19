<script setup lang="ts">
const modalStore = useModalStore();
</script>

<template>
  <div
    class="relative w-full max-w-md bg-stone-800 border border-stone-700 rounded-md overflow-hidden flex flex-col gap-4"
  >
    <div class="flex flex-col items-center justify-center gap-2 p-4">
      <i class="pi pi-eraser text-4xl text-red-600"></i>
      <p class="text-stone-300 text-center text-lg px-8">Deleting item.</p>
      <p class="text-stone-400 text-center text-xs px-8">
        Are you sure you want to proceed? This change is irrevisible.
      </p>
    </div>
    <div
      class="w-full px-2 py-3 md:py-2 border-t border-stone-700 flex justify-center md:justify-between gap-3"
    >
      <button
        @click="modalStore.close()"
        class="px-8 py-3 md:py-2 w-1/3 md:w-auto bg-stone-700 text-stone-300 rounded-md hover:bg-stone-600/90 active:bg-stone-600/90 transition-all font-semibold text-sm cursor-pointer"
      >
        Cancel
      </button>
      <button
        class="px-8 py-3 md:py-2 w-2/3 md:w-auto bg-red-600 text-stone-300 rounded-md hover:bg-red-600/90 active:bg-red-600/90 transition-all font-semibold text-sm cursor-pointer"
      >
        Confirm
      </button>
    </div>
  </div>
</template>
