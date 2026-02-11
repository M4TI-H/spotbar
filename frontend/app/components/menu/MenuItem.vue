<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";

const props = defineProps<{
  item: MenuItem;
}>();
</script>

<template>
  <div class="w-full max-w-[96vw] sm:max-w-md lg:max-w-3xl flex flex-col">
    <div class="w-full h-8 flex items-start justify-between">
      <h1 v-if="props.item.name" class="text-gray-700 text-xl font-semibold">
        {{ props.item.name }}
      </h1>
      <h2 v-if="props.item.price" class="text-gray-700 text-xl">
        {{ props.item.price }} PLN
      </h2>
    </div>
    <p
      v-if="props.item.description"
      class="text-sm text-gray-400 first-letter:uppercase lowercase"
    >
      {{ props.item.description.join(", ") }}
    </p>
  </div>
</template>
