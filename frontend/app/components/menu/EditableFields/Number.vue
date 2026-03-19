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
  <div class="relative w-full shadow-lg">
    <input
      @blur="formatOnBlur"
      :value="displayValue"
      class="w-full px-3 py-2 border border-stone-700 rounded-md focus:border-emerald-600 outline-0 transition-all text-sm text-stone-300"
      :class="{
        'border-red-400! focus:border-red-500': error,
        'pr-12': suffix,
      }"
      type="number"
      placeholder="0.00"
    />
    <div
      v-if="suffix"
      class="absolute inset-y-0 right-0 px-2 max-w-12 flex items-center pointer-events-none bg-stone-600 rounded-r-md border border-stone-700"
    >
      <p class="text-sm text-stone-400 lowercase tracking-tighter">
        {{ suffix }}
      </p>
    </div>
  </div>
</template>
