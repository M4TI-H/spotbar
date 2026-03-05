<script setup lang="ts">
import { useFormat } from "~/composables/utils/useFormat";
import type MenuItem from "~/models/MenuItem";

defineProps<{
  item?: MenuItem;
  sectionLength: number;
}>();

const menuStore = useMenuStore();
const menuItemStore = useMenuItemStore();

const { formatPrice } = useFormat();

const popoverRef = ref();

const toggleOptions = (event: any) => {
  popoverRef.value?.toggle(event);
};

const openEditForm = (event: any, item: MenuItem) => {
  toggleOptions(event);
  menuItemStore.openToEdit(item);
};

const removeItem = (event: any, itemId: string) => {
  toggleOptions(event);
  menuStore.removeItem(itemId);
};
</script>

<template>
  <div v-if="item" class="w-full flex flex-col">
    <div class="w-full flex items-center justify-between gap-4">
      <div class="w-full h-8 flex items-start justify-between">
        <div class="flex items-center">
          <h1 v-if="item.name" class="text-gray-700 text-lg font-semibold mr-2">
            {{ item.name }}
          </h1>
          <button
            v-if="item.position > 1"
            @click="menuStore.reorderItems(item.id, -1)"
            class="px-1 rounded-md text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <i class="pi pi-chevron-up text-sm"></i>
          </button>
          <button
            v-if="item.position < sectionLength"
            @click="menuStore.reorderItems(item.id, 1)"
            class="px-1 rounded-md text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <i class="pi pi-chevron-down text-sm"></i>
          </button>
        </div>

        <h2
          v-if="item.price !== null && item.price !== undefined"
          class="text-gray-700 text-xl"
        >
          {{
            Number(item.price) > 0
              ? formatPrice(item.price.toFixed(2))
              : "Complimentary item"
          }}
        </h2>
      </div>
      <div class="flex gap-2">
        <button
          @click="toggleOptions"
          class="hover:bg-gray-100 px-1 rounded-md transition-colors cursor-pointer"
        >
          <i class="pi pi-ellipsis-h text-xs text-gray-400"></i>
        </button>
        <Popover ref="popoverRef">
          <div
            class="flex flex-col w-32 bg-white rounded-md border border-gray-300 shadow-lg"
          >
            <button
              @click="openEditForm($event, item)"
              class="w-full py-2 px-3 rounded-b-md text-xs text-gray-500 hover:bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2 cursor-pointer"
            >
              <span>Modify</span>
              <i class="pi pi-pencil text-sm"></i>
            </button>
            <button
              @click="removeItem($event, item.id)"
              class="w-full py-2 px-3 rounded-b-md text-xs text-gray-500 bg-red-50 hover:bg-red-100 border-t border-gray-100 flex items-center justify-between gap-2 cursor-pointer"
            >
              <span class="text-red-500">Delete</span>
              <i class="pi pi-trash text-sm text-red-500"></i>
            </button>
          </div>
        </Popover>
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
