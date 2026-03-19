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
    class="w-full h-full flex flex-col md:flex-row items-start gap-4 bg-stone-800 rounded-xl"
  >
    <MenuBuilderNav />
    <div class="w-full md:w-3/4 xl:w-4/5 px-4 md:py-4 flex flex-col">
      <FileSelect v-if="menuStore.selectedBuilderSection === 'upload'" />
      <MenuOptions v-if="menuStore.selectedBuilderSection === 'details'" />
      <Menu v-if="menuStore.selectedBuilderSection === 'menu'" />
      <Layout v-if="menuStore.selectedBuilderSection === 'layout'" />
    </div>
  </div>
</template>
