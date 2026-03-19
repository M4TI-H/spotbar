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
    <label
      class="text-xs lg:text-sm font-semibold capitalize text-stone-400 ml-1"
      >Item category</label
    >
    <select
      v-model="model"
      class="w-full px-3 py-2 border border-stone-700 rounded-md focus:border-emerald-600 outline-0 transition-all text-sm text-stone-300 shadow-lg"
    >
      <option v-for="cat in menuStore.categories" :key="cat.id" :value="cat.id">
        {{ cat.name }}
        {{ cat.is_alcoholic ? "(Alc.)" : "" }}
      </option>
    </select>
  </div>
</template>
