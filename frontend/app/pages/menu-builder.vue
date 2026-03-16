<script setup lang="ts">
import FileSelect from "~/components/imageConverter/FileSelect.vue";
import Menu from "~/components/menu/Menu.vue";
import Layout from "~/components/menu/Options/Layout.vue";

definePageMeta({
  layout: "focus",
});

const menuStore = useMenuStore();
</script>

<template>
  <div
    class="w-full h-full flex flex-col md:flex-row items-start gap-4 bg-stone-800 rounded-md"
  >
    <MenuBuilderNav />
    <div class="w-full md:w-3/4 xl:w-4/5 p-4 flex flex-col">
      <MenuOptions v-if="menuStore.selectedBuilderSection === 'details'" />
      <FileSelect v-if="menuStore.selectedBuilderSection === 'upload'" />
      <Menu v-if="false" />
      <Layout v-if="menuStore.selectedBuilderSection === 'layout'" />
      <div
        v-if="false"
        class="w-full max-w-xs px-4 py-3 flex flex-col gap-4 rounded-md border border-gray-300"
      >
        <button
          class="w-full py-2 text-sm text-gray-500 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors"
        >
          Preview
        </button>
        <div class="w-full flex items-center gap-2">
          <button
            class="px-6 py-2 text-sm text-red-500 rounded-md bg-red-100 border border-red-300 hover:bg-red-200 cursor-pointer transition-colors"
          >
            Discard
          </button>
          <button
            class="w-full py-2 text-sm text-emerald-500 rounded-md bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 cursor-pointer transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
