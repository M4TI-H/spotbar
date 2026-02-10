<script setup lang="ts">
const text = ref<string>("");
const numeric = ref<number | null>();
const isLoading = ref<boolean>(false);

const submitForm = async () => {
  if (!text.value || numeric.value === null) return;
  isLoading.value = true;

  try {
    const { error } = await useFetch("http://127.0.0.1:8000/menu/test-submit", {
      method: "POST",
      body: {
        text: text.value,
        number: numeric.value,
      },
    });

    if (error.value) throw error.value;
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div
    class="relative w-full max-w-md flex flex-col p-4 gap-4 bg-gray-200 border border-gray-300 rounded-md overflow-hidden"
  >
    <div class="flex flex-col gap-1">
      <h2 class="text-xl sm:text-2xl font-bold text-gray-800">
        Temporary form
      </h2>
      <p class="text-sm sm:text-base text-gray-400">Testing API connection</p>
    </div>
    <input
      type="text"
      v-model="text"
      placeholder="Text value"
      class="w-full px-2 py-1 rounded-md text-gray-900 border bg-white border-gray-300 focus:outline-none focus:border-gray-400 transition-all"
    />
    <input
      type="number"
      v-model="numeric"
      placeholder="Numeric value"
      class="w-full px-2 py-1 rounded-md text-gray-900 border bg-white border-gray-300 focus:outline-none focus:border-gray-400 transition-all"
    />
    <button
      @click="submitForm"
      class="self-end py-1 px-2 w-full max-w-24 rounded-md text-gray-900 border bg-white border-gray-300 hover:bg-gray-100 transition-all cursor-pointer"
    >
      {{ isLoading ? "Loading" : "Submit" }}
    </button>
  </div>
</template>
