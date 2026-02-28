<script setup lang="ts">
import { useFormat } from "~/composables/utils/useFormat";
import type MenuItem from "~/models/MenuItem";

defineProps<{
  item?: MenuItem;
}>();

const menuStore = useMenuStore();
const menuItemStore = useMenuItemStore();

const { formatPrice } = useFormat();
</script>

<template>
  <div v-if="item" class="w-full flex flex-col">
    <div class="w-full flex items-center justify-between gap-4">
      <div class="w-full h-8 flex items-start justify-between">
        <div class="flex gap-2 items-end">
          <h1 v-if="item.name" class="text-gray-700 text-lg font-semibold">
            {{ item.name }}
          </h1>
        </div>

        <h2 v-if="item.price" class="text-gray-700 text-xl">
          {{ formatPrice(item.price.toFixed(2)) }}
        </h2>
      </div>
      <div class="flex gap-2">
        <button
          @click="menuItemStore.openToEdit(item)"
          class="text-sm text-amber-500 p-2 bg-amber-100 border border-amber-300 hover:bg-amber-200 rounded-md cursor-pointer flex items-center gap-2 transition-colors"
        >
          <i class="pi pi-pencil text-sm"></i>
        </button>
        <button
          @click="menuStore.removeItem(item.id)"
          class="text-sm text-red-500 p-2 bg-red-100 border border-red-300 hover:bg-red-200 rounded-md cursor-pointer flex items-center gap-2 transition-colors"
        >
          <i class="pi pi-trash text-sm"></i>
        </button>
      </div>
    </div>

    <p
      v-if="item.ingredients"
      class="text-sm text-gray-400 first-letter:uppercase lowercase"
    >
      {{ item.ingredients.join(", ") }}
    </p>
    <p
      v-if="item.description"
      class="text-sm text-gray-400 first-letter:uppercase lowercase"
    >
      {{ item.description }}
    </p>
  </div>
</template>
