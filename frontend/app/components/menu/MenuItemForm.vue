<script setup lang="ts">
const menuItemStore = useMenuItemStore();

const isSimpleField = (value: any) => typeof value !== "object";
</script>

<template>
  <section class="w-screen h-screen z-100 fixed bg-black/40">
    <div
      v-if="menuItemStore.data"
      class="absolute w-full max-w-[96vw] sm:max-w-lg z-20 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white border border-gray-400 rounded-md p-4 flex flex-col gap-4"
    >
      <div
        class="flex items-center justify-between border-b border-gray-400 pb-2"
      >
        <h1 class="text-lg font-semibold text-gray-700 truncate">
          Editing: {{ menuItemStore.data.name }}
        </h1>
        <button
          @click="menuItemStore.close()"
          class="text-sm text-gray-400 hover:text-gray-500 cursor-pointer"
        >
          Close
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <div v-for="(value, key) in menuItemStore.data" :key="key">
          <div v-if="isSimpleField(value)" class="flex flex-col gap-1">
            <label class="text-xs font-semibold uppercase text-gray-400 ml-1">
              {{ key }}
            </label>

            <textarea
              v-if="key === 'description'"
              v-model="menuItemStore.data[key]"
              class="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-0 transition-all h-24 text-sm resize-none"
              :placeholder="key"
            ></textarea>

            <input
              v-else
              v-model="menuItemStore.data[key]"
              class="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-0 transition-all"
              type="text"
              :placeholder="key"
            />
          </div>
        </div>
      </div>

      <div v-if="menuItemStore.data.ingredients" class="flex flex-col gap-2">
        <label class="text-xs font-semibold uppercase text-gray-400 ml-1"
          >Ingredients
        </label>
        <textarea
          :value="menuItemStore.data.ingredients.join(', ')"
          @input="
            (e) =>
              (menuItemStore.data!.ingredients = (
                e.target as HTMLTextAreaElement
              ).value
                .split(',')
                .map((s) => s.trim()))
          "
          class="w-full px-3 py-2 rounded-md border border-gray-300 outline-0 h-20 text-sm"
        ></textarea>
      </div>

      <button
        class="w-full py-2 border-2 border-dashed border-gray-300 text-gray-400 hover:border-emerald-400 hover:text-emerald-500 rounded-md transition-colors text-sm font-semibold cursor-pointer"
      >
        + Add custom attribute (Glass, Method, etc.)
      </button>

      <div class="flex gap-2 mt-2">
        <button
          @click="menuItemStore.save()"
          class="flex-1 bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors font-bold cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  </section>
</template>
