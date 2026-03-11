<script setup lang="ts">
import { useFormat } from "~/composables/utils/useFormat";

const { getCurrencySymbol } = useFormat();
const menuStore = useMenuStore();

const props = defineProps<{
  attributes: { key: string; label: string; value: any; suffix: string }[];
}>();

const formatDisplayValue = (value: any, key: string) => {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value;
};
</script>

<template>
  <div class="w-full flex flex-col gap-3 mt-2">
    <div class="w-full flex items-center gap-2">
      <div class="w-1/30 h-px bg-gray-300"></div>
      <h2 class="text-gray-500 uppercase whitespace-nowrap">
        Hidden attributes
      </h2>
      <div class="w-full h-px bg-gray-300"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="attr in attributes"
        :key="attr.key"
        class="flex flex-col gap-0.5"
      >
        <div class="w-full flex items-center justify-between px-2">
          <label
            class="text-[10px] font-semibold uppercase text-gray-400 tracking-wider flex items-center gap-1"
          >
            {{ attr.label }}
          </label>

          <button
            class="text-[10px] font-semibold text-gray-400 tracking-wider cursor-pointer transition-colors hover:text-gray-500"
          >
            Unhide
          </button>
        </div>

        <div class="relative w-full opacity-60">
          <div
            :class="{ 'pr-12': attr.suffix }"
            class="w-full px-3 py-2 border border-dashed border-gray-400 bg-gray-50 rounded-md text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {{ formatDisplayValue(attr.value, attr.key) }}
          </div>

          <div
            v-if="attr.suffix"
            class="absolute inset-y-0 right-0 px-2 max-w-12 flex items-center bg-gray-200/50 rounded-r-md border border-dashed border-gray-300"
          >
            <p
              class="text-sm font-semibold text-gray-400 lowercase tracking-tighter"
            >
              {{
                attr.suffix === menuStore.defaultCurrency
                  ? getCurrencySymbol(attr.suffix)
                  : attr.suffix
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
