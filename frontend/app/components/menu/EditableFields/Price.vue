<script setup lang="ts">
import { useFormat } from "~/composables/utils/useFormat";

const menuStore = useMenuStore();
const { getCurrencySymbol } = useFormat();

const model = defineModel<number | null>({ default: 0 });
const displayValue = ref(model.value?.toFixed(2) || "0.00");

defineProps<{
  suffix?: string;
}>();

const formatNumber = (val: number | null | undefined) => {
  if (val === null || val === undefined || isNaN(val)) return "0.00";
  return val.toFixed(2);
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let rawValue = target.value;

  rawValue = rawValue.replace(",", ".");

  let cleanedValue = rawValue.replace(/[^0-9.]/g, "");

  const parts = cleanedValue.split(".");

  if (parts.length > 1) {
    cleanedValue = parts[0] + "." + parts[1]?.slice(0, 2);
  }

  displayValue.value = cleanedValue;
  target.value = cleanedValue;

  const num = parseFloat(cleanedValue);
  model.value = isNaN(num) ? 0 : num;
};

const formatOnBlur = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let val = parseFloat(target.value.replace(",", "."));

  if (isNaN(val) || val < 0) val = 0;

  const finalValue = Math.round(val * 100) / 100;
  model.value = finalValue;
  target.value = finalValue.toFixed(2);
};

const selectAll = (event: FocusEvent) => {
  (event.target as HTMLInputElement).select();
};

onMounted(() => {
  displayValue.value = formatNumber(model.value);
});
</script>

<template>
  <div class="relative w-full">
    <input
      :value="displayValue"
      @input="handleInput"
      @blur="formatOnBlur"
      @focus="selectAll"
      :class="{ 'pr-12': suffix }"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm text-gray-700"
      type="text"
      inputmode="decimal"
      placeholder="0.00"
    />
    <div
      v-if="suffix"
      class="absolute inset-y-0 right-0 px-3 flex items-center pointer-events-none bg-gray-200 rounded-r-md border border-gray-300"
    >
      <p class="text-sm font-semibold text-gray-400 lowercase tracking-tighter">
        {{
          suffix === menuStore.defaultCurrency
            ? getCurrencySymbol(suffix)
            : suffix
        }}
      </p>
    </div>
  </div>
</template>
