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
  if (count > 40) return "text-red-500 font-bold";
  if (count > 20) return "text-amber-500 font-bold";
  return "text-gray-400 font-medium";
});
</script>
<template>
  <div class="md:col-span-3 flex flex-col gap-1">
    <div class="w-full flex items-center justify-between">
      <label
        class="text-[10px] font-semibold uppercase text-gray-400 tracking-wider ml-1"
        >Ingredients</label
      >
    </div>

    <div class="w-full relative">
      <textarea
        v-model="displayValue"
        placeholder="e.g. Gin, Tonic, Lime, Ice"
        class="w-full px-3 pt-2 pb-3 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 h-20 text-sm resize-none"
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
