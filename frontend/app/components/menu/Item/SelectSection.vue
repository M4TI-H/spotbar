<script setup lang="ts">
const model = defineModel<string | number>();

const menuStore = useMenuStore();
</script>
<template>
  <div class="flex flex-col pt-1 gap-1.5">
    <label
      class="text-xs lg:text-sm font-semibold capitalize text-stone-400 ml-1"
      >Menu Section</label
    >
    <select
      v-model="model"
      class="w-full px-3 py-2 border border-stone-700 rounded-md focus:border-emerald-600 outline-0 transition-all text-sm text-stone-300 shadow-lg"
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
