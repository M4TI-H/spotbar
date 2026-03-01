<script setup lang="ts">
import { useFormat } from "~/composables/utils/useFormat";

const menuStore = useMenuStore();
const { getCurrencySymbol } = useFormat();

const model = defineModel<string | number>();

defineProps<{
  suffix?: string;
}>();
</script>

<template>
  <div class="relative w-full">
    <input
      v-model="model"
      :class="{ 'pr-12': suffix }"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm text-gray-700"
      type="number"
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
