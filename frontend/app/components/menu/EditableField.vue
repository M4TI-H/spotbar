<script setup lang="ts">
import { useFormat } from "~/composables/utils/useFormat";

const menuStore = useMenuStore();
const { getCurrencySymbol } = useFormat();

const model = defineModel<string | number>();

const props = defineProps<{
  label: string;
  isHideable?: boolean;
  suffix?: string;
}>();

const popover = ref();

const toggleOptions = (event: any) => {
  if (!popover.value) return;

  popover.value.toggle(event);
};
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <div class="w-full flex items-center justify-between px-1">
      <label
        class="text-[10px] font-semibold uppercase text-gray-400 tracking-wider"
        >{{ label }}</label
      >
      <button
        @click="toggleOptions"
        class="hover:bg-gray-100 px-1 rounded-md transition-colors cursor-pointer"
      >
        <i class="pi pi-ellipsis-h text-xs text-gray-400"></i>
      </button>
      <Popover ref="popover">
        <div
          class="flex flex-col w-44 bg-white rounded-md border border-gray-300 shadow-lg"
        >
          <button
            class="w-full py-2 px-3 rounded-t-md text-left text-xs text-gray-500 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
          >
            <i class="pi pi-eye-slash"></i>
            Hide attribute
          </button>
          <button
            class="w-full py-2 px-3 rounded-b-md text-left text-xs text-gray-500 hover:bg-gray-50 border-t border-gray-100 flex items-center gap-2 cursor-pointer"
          >
            <i class="pi pi-eye-slash"></i>

            <div class="flex flex-col min-w-0">
              <span>Hide attribute in section</span>
              <span class="font-semibold text-emerald-600 truncate">
                Luxury & Vintage Cocktails
              </span>
            </div>
          </button>
          <button
            class="w-full py-2 px-3 rounded-b-md text-left text-xs text-gray-500 hover:bg-gray-50 border-t border-gray-100 flex items-center gap-2 cursor-pointer"
          >
            <i class="pi pi-eye-slash"></i>
            Hide attribute in menu
          </button>
        </div>
      </Popover>
    </div>
    <div class="relative w-full">
      <input
        v-model="model"
        :class="{ 'pr-12': suffix }"
        class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-emerald-500 focus:bg-white outline-0 transition-all text-sm text-gray-700"
        type="text"
      />
      <div
        v-if="suffix"
        class="absolute inset-y-0 right-0 px-3 flex items-center pointer-events-none bg-gray-200 rounded-r-md border border-gray-300"
      >
        <p
          class="text-sm font-semibold text-gray-400 lowercase tracking-tighter"
        >
          {{
            suffix === menuStore.defaultCurrency
              ? getCurrencySymbol(suffix)
              : suffix
          }}
        </p>
      </div>
    </div>
  </div>
</template>
