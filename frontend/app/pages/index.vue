<script setup lang="ts">
const cities = ref([
  { name: "Gdańsk", code: "GD" },
  { name: "Warszawa", code: "WAW" },
  { name: "Kraków", code: "KRK" },
  { name: "Poznań", code: "POZ" },
  { name: "Wrocław", code: "WRO" },
  { name: "Łódź", code: "LDZ" },
]);
</script>

<template>
  <div
    class="w-full min-h-screen flex flex-col items-center gap-8 bg-neutral-50"
  >
    <section
      class="w-full flex flex-col-reverse sm:flex-row gap-2 sm:gap-4 justify-center items-start"
    >
      <div class="w-full sm:w-2xl h-12">
        <input
          type="text"
          placeholder="Spot your place"
          class="size-full p-3 rounded-md text-gray-900 border bg-white border-gray-300 focus:outline-none focus:border-gray-400 transition-all"
        />
      </div>
      <div class="w-48 sm:w-64 h-8 sm:h-12">
        <input
          type="text"
          placeholder="Select location"
          class="placeholder:text-sm sm:placeholder:text-base size-full p-3 rounded-md text-gray-900 border bg-white border-gray-300 focus:outline-none focus:border-gray-400 transition-all"
        />
      </div>
    </section>
    <TestForm />
  </div>
</template>
