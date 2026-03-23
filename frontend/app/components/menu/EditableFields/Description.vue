<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <div class="col-span-1 md:col-span-2 xl:col-span-3 flex flex-col gap-1">
    <label
      class="text-xs lg:text-sm font-semibold capitalize ml-1 text-stone-400"
      >Description</label
    >
    <div class="w-full relative">
      <textarea
        v-model="model"
        :maxlength="200"
        class="w-full px-3 pt-2 pb-3 border border-stone-700 rounded-md focus:border-emerald-600 outline-0 transition-all h-20 text-sm text-stone-300 resize-none shadow-lg"
        placeholder="Describe this item..."
      ></textarea>
      <p
        class="absolute bottom-3 right-3 text-xs text-stone-300 pointer-events-none"
      >
        {{ model?.length }}/200
      </p>
    </div>
  </div>
</template>
