<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";

const props = defineProps<{
  item: MenuItem;
}>();

const menuItemStore = useMenuItemStore();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: menuItemStore.defaultCurrency,
  }).format(price);
};
</script>

<template>
  <div class="w-full max-w-[96vw] sm:max-w-md lg:max-w-3xl flex flex-col">
    <div class="w-full h-8 flex items-start justify-between">
      <div class="flex gap-2 items-end">
        <h1 v-if="props.item.name" class="text-gray-700 text-lg font-semibold">
          {{ props.item.name }}
        </h1>
        <button
          @click="menuItemStore.open(item)"
          class="text-sm text-gray-400 hover:text-gray-500 cursor-pointer"
        >
          Modify
        </button>
      </div>

      <h2 v-if="props.item.price" class="text-gray-700 text-xl">
        {{ formatPrice(props.item.price) }}
      </h2>
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
