<script setup lang="ts">
import type { CustomAttribute } from "~/models/MenuItem";

const emit = defineEmits<{
  (e: "addAttribute", attribute: CustomAttribute): void;
}>();

const isEdited = ref<boolean>(false);
const newAttribute = ref<CustomAttribute | null>(null);

const handleResetValue = () => {
  newAttribute.value = {
    label: "",
    type: "text",
    suffix: "",
    value: "",
    visibility: "all",
  };
  isEdited.value = !isEdited.value;
};

const handleConfirmNewAttribute = () => {
  if (!newAttribute.value?.label.trim()) return;

  emit("addAttribute", { ...newAttribute.value });

  handleResetValue();
};
</script>

<template>
  <div>
    <div class="w-full flex items-center gap-2">
      <div class="w-1/30 h-px bg-gray-300"></div>
      <h2 class="text-gray-500 uppercase whitespace-nowrap">
        Custom attributes
      </h2>
      <div class="w-full h-px bg-gray-300"></div>
    </div>
    <div class="col-span-3 pt-2 mx-2">
      <template v-if="!isEdited">
        <button
          @click="handleResetValue"
          class="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-200 text-gray-400 hover:border-emerald-300 hover:text-emerald-600 rounded-md transition-all text-xs font-semibold cursor-pointer w-fit"
        >
          <span>+</span> ADD CUSTOM ATTRIBUTE (GLASS, METHOD, ETC.)
        </button>
      </template>
      <template v-else-if="newAttribute">
        <div class="w-full flex flex-col gap-2">
          <div class="w-sm flex gap-2">
            <button
              @click="newAttribute.visibility = 'all'"
              class="py-1 w-1/3 flex items-center justify-center gap-2 border rounded-md text-sm cursor-pointer transition-colors"
              :class="
                newAttribute.visibility === 'all'
                  ? 'bg-sky-100 border-sky-300 text-sky-500 hover:bg-sky-200'
                  : 'bg-none border-gray-300 text-gray-400 hover:bg-gray-100'
              "
            >
              All items
            </button>
            <button
              @click="newAttribute.visibility = 'section'"
              class="py-1 w-1/3 flex items-center justify-center gap-2 border rounded-md text-sm cursor-pointer transition-colors"
              :class="
                newAttribute.visibility === 'section'
                  ? 'bg-sky-100 border-sky-300 text-sky-500 hover:bg-sky-200'
                  : 'bg-none border-gray-300 text-gray-400 hover:bg-gray-100'
              "
            >
              This section
            </button>
            <button
              @click="newAttribute.visibility = 'single'"
              class="py-1 w-1/3 flex items-center justify-center gap-2 border rounded-md text-sm cursor-pointer transition-colors"
              :class="
                newAttribute.visibility === 'single'
                  ? 'bg-sky-100 border-sky-300 text-sky-500 hover:bg-sky-200'
                  : 'bg-none border-gray-300 text-gray-400 hover:bg-gray-100'
              "
            >
              This item only
            </button>
          </div>
          <div>
            <input
              v-model="newAttribute.label"
              type="text"
              class="w-sm px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm text-gray-700"
              placeholder="Attribute label"
            />
            <p class="text-gray-400 text-[12px] pl-2">
              i.e. glass type, age, ABV.
            </p>
          </div>

          <div class="w-sm flex items-center gap-2">
            <button
              @click="newAttribute.type = 'text'"
              class="min-w-18 px-2 py-1 flex items-center justify-center gap-2 border rounded-md text-sm cursor-pointer transition-colors"
              :class="
                newAttribute.type === 'text'
                  ? 'bg-amber-100 border-amber-300 text-amber-500 hover:bg-amber-200'
                  : 'bg-none border-gray-300 text-gray-400 hover:bg-gray-100'
              "
            >
              <i class="pi pi-align-left text-xs"></i>
              <span>Text</span>
            </button>
            <button
              @click="newAttribute.type = 'number'"
              class="min-w-24 px-2 py-1 flex items-center justify-center gap-2 border rounded-md text-sm cursor-pointer transition-colors"
              :class="
                newAttribute.type === 'number'
                  ? 'bg-amber-100 border-amber-300 text-amber-500 hover:bg-amber-200'
                  : 'bg-none border-gray-300 text-gray-400 hover:bg-gray-100'
              "
            >
              <i class="pi pi-hashtag text-xs"></i>
              <span>Numeric</span>
            </button>
            <input
              v-if="newAttribute.type === 'number'"
              v-model="newAttribute.suffix"
              type="text"
              class="w-full px-3 py-1 border border-gray-300 rounded-md focus:border-emerald-300 outline-0 transition-all text-sm text-gray-700"
              placeholder="Suffix (optional)"
            />
          </div>
          <div class="w-sm flex items-center gap-2 justify-end">
            <button
              @click="handleResetValue"
              class="hover:bg-gray-100 text-gray-400 text-sm py-1 px-3 rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              @click="handleConfirmNewAttribute"
              class="py-1 px-3 text-sm text-emerald-500 rounded-md bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 cursor-pointer transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
