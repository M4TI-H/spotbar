<script setup lang="ts">
import type MenuItem from "~/models/MenuItem";

const menuItemStore = useMenuItemStore();
const menuStore = useMenuStore();

const isSimpleField = (value: any) => typeof value !== "object";

const localData = ref<MenuItem | null>(null);

const saveChanges = async () => {
  if (!localData.value) return;

  try {
    // data has been saved
    const success = await menuStore.save(localData.value);

    if (success) {
      // check if correct data has been saved (the same values)
      const savedItem = menuStore.menu.find(
        (i) => i.id === localData.value?.id,
      );

      const isCorrect =
        JSON.stringify(savedItem) === JSON.stringify(localData.value);

      if (isCorrect) {
        menuItemStore.close();
      }
    } else {
      console.log("Failed to save changes. Try again.");
    }
  } catch (err: any) {
    console.log("Server has failed.");
  } finally {
    //loading spinner
  }
};

//initial values copy
watch(
  () => menuItemStore.data,
  (newData) => {
    if (newData) {
      localData.value = JSON.parse(JSON.stringify(newData));
    } else {
      localData.value = null;
    }
  },
  { immediate: true },
);
</script>

<template>
  <section
    class="w-screen h-screen z-100 fixed bg-black/40 flex items-center justify-center p-4"
  >
    <div
      v-if="localData"
      class="w-full max-w-4xl bg-white border border-gray-400 rounded-md shadow-2xl flex flex-col"
    >
      <div
        class="flex items-center justify-between px-4 py-4 border-b border-gray-200"
      >
        <h1 class="text-xl font-semibold text-gray-800">
          Modifying {{ localData.name }}
        </h1>
      </div>

      <div class="p-4 overflow-y-auto max-h-[80vh]">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <template v-for="(value, key) in localData" :key="key">
            <div
              v-if="
                isSimpleField(value) && key !== 'description' && key !== 'id'
              "
              class="flex flex-col gap-1"
            >
              <label
                class="text-[10px] font-semibold uppercase text-gray-400 tracking-wider ml-1"
                >{{ key }}</label
              >
              <input
                v-model="localData[key]"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:border-emerald-500 focus:bg-white outline-0 transition-all text-sm text-gray-700"
                type="text"
              />
            </div>
          </template>

          <div class="md:col-span-3 flex flex-col gap-1">
            <label
              class="text-[10px] font-bold uppercase text-gray-400 tracking-wider ml-1"
              >Description</label
            >
            <textarea
              v-model="localData.description"
              class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded focus:border-emerald-500 focus:bg-white outline-0 transition-all h-20 text-sm resize-none"
              placeholder="Describe this item..."
            ></textarea>
          </div>

          <div
            v-if="localData.ingredients"
            class="md:col-span-3 flex flex-col gap-1"
          >
            <label
              class="text-[10px] font-bold uppercase text-gray-400 tracking-wider ml-1"
              >Ingredients</label
            >
            <textarea
              :value="localData.ingredients.join(', ')"
              @input="
                (e) =>
                  (localData!.ingredients = (
                    e.target as HTMLTextAreaElement
                  ).value
                    .split(',')
                    .map((s) => s.trim()))
              "
              class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:border-emerald-500 focus:bg-white outline-0 h-16 text-sm resize-none"
            ></textarea>
          </div>

          <div class="md:col-span-3 pt-2">
            <button
              class="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-200 text-gray-400 hover:border-emerald-300 hover:text-emerald-600 rounded-md transition-all text-xs font-semibold cursor-pointer w-fit"
            >
              <span>+</span> ADD CUSTOM ATTRIBUTE (GLASS, METHOD, ETC.)
            </button>
          </div>
        </div>
      </div>

      <div
        class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3"
      >
        <button
          @click="menuItemStore.close()"
          class="px-6 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="saveChanges"
          class="px-8 py-2 bg-emerald-600 text-white rounded shadow-md hover:bg-emerald-700 transition-all font-semibold text-sm cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  </section>
</template>
