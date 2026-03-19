<script setup lang="ts">
import ItemForm from "~/components/modals/ItemForm.vue";
import { useFormat } from "~/composables/utils/useFormat";
import type MenuItem from "~/models/MenuItem";

defineProps<{
  item?: MenuItem;
  sectionLength: number;
}>();

const menuStore = useMenuStore();
const modalStore = useModalStore();
const menuItemStore = useMenuItemStore();

const { formatPrice } = useFormat();

const popoverRef = ref();

const toggleOptions = (event: any) => {
  popoverRef.value?.toggle(event);
};

const openEditForm = (item: MenuItem) => {
  modalStore.open(ItemForm, {
    data: item,
  });
};

const removeItem = (event: any, itemId: string) => {
  toggleOptions(event);
  menuStore.removeItem(itemId);
};
</script>

<template>
  <div
    v-if="item"
    @click="openEditForm(item)"
    class="w-full flex flex-col hover:bg-stone-900/40 active:bg-stone-900/40 py-2 md:py-4 px-2 md:px-6 rounded-xl cursor-pointer group transition-all"
  >
    <div class="w-full flex items-start justify-between gap-4">
      <div class="flex-1 min-w-0 flex flex-col">
        <div class="flex items-center gap-2">
          <h1
            v-if="item.name"
            class="text-stone-300 sm:text-lg font-semibold truncate"
          >
            {{ item.name }}
          </h1>
        </div>

        <div class="flex flex-col mt-1">
          <p
            v-if="item.description"
            class="text-xs md:text-sm text-stone-500 italic first-letter:uppercase lowercase line-clamp-1"
          >
            {{ item.description }}
          </p>
          <p
            v-if="item.ingredients && item.ingredients.length"
            class="text-xs md:text-sm text-stone-500 first-letter:uppercase lowercase line-clamp-1"
          >
            {{ item.ingredients.join(", ") }}
          </p>
        </div>
      </div>

      <div class="flex flex-col items-end gap-2 shrink-0">
        <h2
          v-if="item.price !== null && item.price !== undefined"
          class="text-stone-300 text-base md:text-xl font-medium whitespace-nowrap"
        >
          {{
            Number(item.price) > 0
              ? formatPrice(item.price.toFixed(2))
              : "Complimentary"
          }}
        </h2>

        <div
          class="flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <button
            @click.stop="toggleOptions"
            class="p-1 hover:bg-stone-800 active:bg-stone-800 rounded-md transition-colors cursor-pointer"
          >
            <i class="pi pi-ellipsis-h text-xs text-stone-400"></i>
          </button>

          <button
            v-if="item.position > 1"
            @click.stop="menuStore.reorderItems(item.id, -1)"
            class="p-1 rounded-md text-stone-400 cursor-pointer hover:bg-stone-800 active:bg-stone-800 transition-colors"
          >
            <i class="pi pi-chevron-up text-sm"></i>
          </button>

          <button
            v-if="item.position < sectionLength"
            @click.stop="menuStore.reorderItems(item.id, 1)"
            class="p-1 rounded-md text-stone-400 cursor-pointer hover:bg-stone-800 active:bg-stone-800 transition-colors"
          >
            <i class="pi pi-chevron-down text-sm"></i>
          </button>
        </div>
      </div>
    </div>

    <Popover ref="popoverRef">
      <div
        class="flex flex-col w-32 bg-stone-800 rounded-md border border-stone-700 shadow-lg overflow-hidden"
      >
        <!-- <button
          @click.stop="openEditForm($event, item)"
          class="w-full py-2 px-3 text-xs text-stone-400 hover:bg-stone-900/40 active:bg-stone-900/40 flex items-center justify-between gap-2 cursor-pointer"
        >
          <span>Modify</span>
          <i class="pi pi-pencil text-[10px]"></i>
        </button> -->
        <button
          @click.stop="removeItem($event, item.id)"
          class="w-full py-2 px-3 text-xs text-red-400 hover:bg-stone-900/40 active:bg-stone-900/40 flex items-center justify-between gap-2 cursor-pointer"
        >
          <span>Delete</span>
          <i class="pi pi-trash text-[10px]"></i>
        </button>
      </div>
    </Popover>
  </div>
</template>
