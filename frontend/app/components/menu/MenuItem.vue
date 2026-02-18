<script setup lang="ts">
import type MenuItem from "~/models/MenuItem";

const props = defineProps<{
  item: MenuItem;
}>();

const menuStore = useMenuStore();
const menuItemStore = useMenuItemStore();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: menuItemStore.defaultCurrency,
  }).format(price);
};
</script>

<template>
  <div class="w-full max-w-[96vw] sm:max-w-md lg:max-w-4xl flex flex-col">
    <div class="w-full flex items-center justify-between gap-4">
      <div class="w-full h-8 flex items-start justify-between">
        <div class="flex gap-2 items-end">
          <h1
            v-if="props.item.name"
            class="text-gray-700 text-lg font-semibold"
          >
            {{ props.item.name }}
          </h1>
        </div>

        <h2 v-if="props.item.price" class="text-gray-700 text-xl">
          {{ formatPrice(props.item.price) }}
        </h2>
      </div>
      <div class="flex gap-2">
        <button
          @click="menuItemStore.open(item)"
          class="text-sm text-gray-800 py-2 px-3 border border-gray-400 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          Edit
        </button>
        <button
          @click="menuStore.removeItem(item.id)"
          class="text-sm text-gray-800 py-2 px-3 border border-gray-400 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>

    <p
      v-if="props.item.ingredients"
      class="text-sm text-gray-400 first-letter:uppercase lowercase"
    >
      {{ props.item.ingredients.join(", ") }}
    </p>
    <p
      v-if="props.item.description"
      class="text-sm text-gray-400 first-letter:uppercase lowercase"
    >
      {{ props.item.description }}
    </p>
  </div>
</template>
