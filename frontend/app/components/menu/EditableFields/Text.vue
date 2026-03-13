<script setup lang="ts">
const model = defineModel<string | number>();

defineProps<{
  error: boolean;
}>();
</script>

<template>
  <input
    v-model="model"
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm text-gray-700"
    :class="{ 'text-red-500 border-red-300 bg-red-100': error }"
    type="text"
  />
</template>
