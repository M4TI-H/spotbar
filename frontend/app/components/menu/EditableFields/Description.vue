<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <div class="md:col-span-3 flex flex-col gap-1">
    <label
      class="text-[10px] font-bold uppercase text-gray-400 tracking-wider ml-1"
      >Description</label
    >
    <div class="w-full relative">
      <textarea
        v-model="model"
        :maxlength="200"
        class="w-full px-3 pt-2 pb-3 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all h-20 text-sm resize-none overflow-hidden"
        placeholder="Describe this item..."
      ></textarea>
      <p
        class="absolute bottom-3 right-3 text-xs text-gray-500 pointer-events-none"
      >
        {{ model?.length }}/200
      </p>
    </div>
  </div>
</template>
