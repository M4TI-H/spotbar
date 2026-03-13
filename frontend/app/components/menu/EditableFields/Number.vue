<script setup lang="ts">
import { useFormat } from "~/composables/utils/useFormat";

const model = defineModel<number | null>({ default: 0 });
const displayValue = ref(model.value?.toFixed(2) || "0.00");

defineProps<{
  suffix?: string;
  error: boolean;
}>();

const formatNumber = (val: number | null | undefined) => {
  if (val === null || val === undefined || isNaN(val)) return "0";
  return val.toFixed(2);
};

const formatOnBlur = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let val = parseFloat(target.value.replace(",", "."));

  if (isNaN(val) || val < 0) val = 0;

  const finalValue = Math.round(val * 100) / 100;
  model.value = finalValue;
  target.value = finalValue.toFixed(2);
};

onMounted(() => {
  displayValue.value = formatNumber(model.value);
});
</script>

<template>
  <div class="relative w-full">
    <input
      @blur="formatOnBlur"
      :value="displayValue"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm text-gray-700"
      :class="{
        'text-red-500 border-red-300 bg-red-100': error,
        'pr-12': suffix,
      }"
      type="number"
      placeholder="0.00"
    />
    <div
      v-if="suffix"
      class="absolute inset-y-0 right-0 px-2 max-w-12 flex items-center pointer-events-none bg-gray-200 rounded-r-md border border-gray-300"
    >
      <p class="text-sm font-semibold text-gray-400 lowercase tracking-tighter">
        {{ suffix }}
      </p>
    </div>
  </div>
</template>
