<script setup lang="ts">
const model = defineModel<string[]>();

const displayValue = computed({
  get: () => {
    return model.value ? model.value.join(", ") : "";
  },
  set: (newValue: string) => {
    model.value = newValue
      .split(", ")
      .map((s) => s.substring(0, 100))
      .filter((s, index, array) => {
        if (index === array.length - 1) return true;
        return s !== "";
      })
      .slice(0, 50);
  },
});

const ingredientsCount = computed(() => {
  if (!model.value) return 0;
  return model.value.filter((s) => s.trim().length > 0).length;
});

const counterClass = computed(() => {
  const count = ingredientsCount.value;
  if (count > 40) return "text-red-500";
  if (count > 20) return "text-amber-500";
  return "text-stone-300";
});
</script>
<template>
  <div class="col-span-1 md:col-span-2 xl:col-span-3 flex flex-col gap-1">
    <div class="w-full flex items-center justify-between">
      <label
        class="text-xs lg:text-sm ml-1 font-semibold capitalize text-stone-400"
        >Ingredients</label
      >
    </div>

    <div class="w-full relative">
      <textarea
        v-model="displayValue"
        placeholder="e.g. Gin, Tonic, Lime, Ice"
        class="w-full px-3 pt-2 pb-3 border border-stone-700 rounded-md focus:border-emerald-600 outline-0 transition-all h-20 text-sm text-stone-300 resize-none shadow-lg"
        :class="{
          'focus:border-amber-300': ingredientsCount > 20,
          'focus:border-red-300': ingredientsCount > 40,
        }"
      ></textarea>
      <div class="absolute bottom-3 right-3 pointer-events-none">
        <span :class="counterClass" class="text-xs tracking-tighter">
          {{ ingredientsCount }} / 50
        </span>
      </div>
    </div>
  </div>
</template>
