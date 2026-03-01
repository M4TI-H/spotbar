<script setup lang="ts">
const model = defineModel<string | number>();
</script>

<template>
  <input
    v-model="model"
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm text-gray-700"
    type="text"
  />
</template>
