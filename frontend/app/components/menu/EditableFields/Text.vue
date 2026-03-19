<script setup lang="ts">
const model = defineModel<string | number>();

defineProps<{
  error: boolean;
}>();
</script>

<template>
  <input
    v-model="model"
    class="w-full px-3 py-2 border border-stone-700 rounded-md focus:border-emerald-600 outline-0 transition-all text-sm text-stone-300 shadow-lg"
    :class="{ 'border-red-400! focus:border-red-500': error }"
    type="text"
  />
</template>
