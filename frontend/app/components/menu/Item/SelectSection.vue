<script setup lang="ts">
const model = defineModel<string | number>();

const menuStore = useMenuStore();
</script>
<template>
  <div class="flex flex-col pt-1 gap-1.5">
    <div class="w-full flex items-center justify-between px-1">
      <label
        class="text-[10px] font-semibold uppercase text-gray-400 tracking-wider"
        >Menu Section</label
      >
    </div>
    <select
      v-model="model"
      class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-emerald-500 focus:bg-white outline-0 transition-all text-sm text-gray-700"
    >
      <option
        v-for="section in menuStore.sections"
        :key="section.id"
        :value="section.id"
      >
        {{ section.name }}
      </option>
    </select>
  </div>
</template>
