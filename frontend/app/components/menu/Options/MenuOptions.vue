<script setup lang="ts">
const menuStore = useMenuStore();

const { defaultCurrency } = storeToRefs(menuStore);
</script>

<template>
  <div class="w-full flex flex-col gap-6 md:p-4">
    <h1 class="md:text-xl text-stone-300 font-semibold tracking-wider">
      Menu options & details
    </h1>
    <input
      type="text"
      placeholder="Menu name"
      class="w-full md:w-2/3 px-3 py-2 text-sm md:text-base text-stone-300 border border-stone-700 rounded-md focus:border-emerald-500 placeholder:text-stone-400 outline-0 transition-all"
    />
    <textarea
      placeholder="Menu description"
      class="w-full md:w-2/3 px-3 py-2 text-sm md:text-base text-stone-300 border border-stone-700 rounded-md focus:border-emerald-500 placeholder:text-stone-400 outline-0 transition-all h-20 md:h-28 resize-none"
    ></textarea>
    <div class="w-full md:w-2/3 flex items-center justify-between pl-1">
      <p class="text-sm md:text-base text-stone-400">Default currency:</p>
      <select
        v-model="defaultCurrency"
        class="pl-2 pr-8 py-2 text-sm md:text-base text-stone-300 border border-stone-700 rounded-md focus:border-emerald-500 outline-0 transition-all"
      >
        <option value="PLN" selected>PLN (zł)</option>
        <option value="GBP">GBP (£)</option>
        <option value="EUR">EUR (€)</option>
        <option value="USD">USD ($)</option>
      </select>
    </div>
  </div>
</template>
