<script setup lang="ts">
const model = defineModel<string | number>();
</script>

<template>
  <input
    v-model="model"
    class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-emerald-500 focus:bg-white outline-0 transition-all text-sm text-gray-700"
    type="text"
  />
</template>
