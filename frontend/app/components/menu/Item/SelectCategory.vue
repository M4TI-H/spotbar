<script setup lang="ts">
const model = defineModel<string | number>();

const menuStore = useMenuStore();

watch(
  () => menuStore.categories,
  (newCategories) => {
    if (newCategories.length > 0 && model.value) {
      const current = model.value;
      model.value = "";
      nextTick(() => {
        model.value = current;
      });
    }
  },
  { immediate: true },
);

onMounted(async () => {
  await menuStore.fetchCategories();
});
</script>
<template>
  <div class="flex flex-col pt-1 gap-1.5">
    <div class="w-full flex items-center justify-between px-1">
      <label
        class="text-[10px] font-semibold uppercase text-gray-400 tracking-wider"
        >Item category</label
      >
    </div>
    <select
      v-model="model"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm text-gray-700"
    >
      <option v-for="cat in menuStore.categories" :key="cat.id" :value="cat.id">
        {{ cat.name }}
        {{ cat.is_alcoholic ? "(Alc.)" : "" }}
      </option>
    </select>
  </div>
</template>
