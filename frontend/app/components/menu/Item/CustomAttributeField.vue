<script setup lang="ts">
import type { CustomAttribute } from "~/models/MenuItem";
import { useField } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const emit = defineEmits<{
  (e: "addAttribute", attribute: CustomAttribute): void;
}>();

const isEdited = ref<boolean>(false);
const newAttribute = ref<CustomAttribute | null>(null);

const {
  value: labelValue,
  validate: validateLabel,
  errorMessage: labelError,
  resetField: resetLabel,
} = useField<string>(
  "label",
  toTypedSchema(z.string().min(1, "Label is required.").max(30, "Too long.")),
  {
    initialValue: "",
  },
);

const {
  value: suffixValue,
  errorMessage: suffixError,
  resetField: resetSuffix,
} = useField<string>(
  "suffix",
  toTypedSchema(z.string().max(8, "Max 8 chars.")),
  { initialValue: "" },
);

const startEditing = () => {
  newAttribute.value = {
    label: "",
    type: "text",
    suffix: "",
    value: "",
    visibility: "all",
  };
  isEdited.value = true;
};

const handleResetValue = () => {
  newAttribute.value = null;
  isEdited.value = false;
  resetLabel();
  resetSuffix();
};

const handleConfirmNewAttribute = async () => {
  const { valid } = await validateLabel();

  if (!valid || !newAttribute.value) return;

  newAttribute.value.label = labelValue.value;
  newAttribute.value.suffix = suffixValue.value;

  emit("addAttribute", { ...newAttribute.value });

  handleResetValue();
};
</script>

<template>
  <div
    class="col-span-1 md:col-span-2 xl:col-span-3 pb-4 flex items-center justify-center"
    :class="isEdited ? 'border-t border-stone-700 pt-4' : ''"
  >
    <template v-if="!isEdited">
      <button
        @click="startEditing"
        class="flex items-center gap-2 px-4 py-2 border border-dashed border-stone-700 text-stone-400 hover:border-emerald-600 hover:text-emerald-600 active:border-emerald-600 active:text-emerald-600 rounded-md transition-all text-xs md:text-sm font-semibold cursor-pointer w-fit"
      >
        <span>+</span> Add custom attribute
      </button>
    </template>
    <template v-else-if="newAttribute">
      <form
        @submit.prevent="handleConfirmNewAttribute"
        class="w-full flex flex-col gap-2 px-4"
      >
        <div class="w-full md:max-w-sm flex gap-2">
          <button
            v-for="scope in ['all', 'section', 'single']"
            :key="scope"
            type="button"
            @click="newAttribute.visibility = scope"
            class="py-2 md:py-1 w-1/3 text-xs md:text-sm border rounded-md cursor-pointer transition-all"
            :class="
              newAttribute.visibility === scope
                ? 'bg-orange-300 border-orange-500 text-orange-500'
                : 'bg-stone-600 border-stone-700 text-stone-300 hover:bg-stone-700/90'
            "
          >
            {{
              scope === "all"
                ? "All items"
                : scope === "section"
                  ? "Section"
                  : "This item"
            }}
          </button>
        </div>
        <div>
          <div class="w-full md:max-w-sm relative">
            <input
              v-model="labelValue"
              type="text"
              maxlength="30"
              class="w-full pl-3 pr-6 py-2 border border-stone-700 rounded-md focus:border-emerald-600 outline-0 transition-all text-sm text-stone-300"
              placeholder="Attribute label"
            />
            <p
              class="absolute right-2 top-1/2 -translate-y-1/2 tracking-tight text-xs text-stone-500 pointer-events-none"
            >
              {{ newAttribute.label.length }}/30
            </p>
          </div>

          <div
            class="w-full md:max-w-sm px-2 flex items-center justify-between"
          >
            <p class="w-fit text-gray-400 text-[12px]">
              i.e. glass type, age, ABV.
            </p>
            <p v-if="labelError" class="text-red-500 text-[12px]">
              {{ labelError }}
            </p>
          </div>
        </div>

        <div
          class="w-full md:max-w-sm flex flex-col md:flex-row items-center gap-2"
        >
          <div class="w-full flex items-center gap-2">
            <button
              type="button"
              @click="newAttribute.type = 'text'"
              class="w-1/2 px-2 py-2 md:py-1 flex items-center justify-center gap-2 border rounded-md text-xs md:text-sm cursor-pointer transition-colors"
              :class="
                newAttribute.type === 'text'
                  ? 'bg-purple-300 border-purple-400 text-purple-500 hover:bg-purple-300/90'
                  : 'bg-none border-stone-700 text-stone-300 hover:bg-stone-600/90'
              "
            >
              <i class="pi pi-align-left text-xs"></i>
              <span>Text</span>
            </button>
            <button
              type="button"
              @click="newAttribute.type = 'number'"
              class="w-1/2 px-2 py-2 md:py-1 flex items-center justify-center gap-2 border rounded-md text-xs md:text-sm cursor-pointer transition-colors"
              :class="
                newAttribute.type === 'number'
                  ? 'bg-purple-300 border-purple-400 text-purple-500 hover:bg-purple-300/90'
                  : 'bg-none border-stone-700 text-stone-300 hover:bg-stone-600/90'
              "
            >
              <i class="pi pi-hashtag text-xs"></i>
              <span>Numeric</span>
            </button>
          </div>

          <input
            v-if="newAttribute.type === 'number'"
            v-model="suffixValue"
            type="text"
            maxlength="10"
            class="w-full px-3 py-2 md:py-1 border border-stone-700 rounded-md focus:border-emerald-600 outline-0 text-sm text-stone-300"
            placeholder="Suffix (optional)"
          />
        </div>
        <div class="w-full md:max-w-sm flex items-center gap-2 justify-end">
          <button
            type="button"
            @click="handleResetValue"
            class="hover:bg-stone-700/90 active:bg-stone-700/90 text-stone-400 text-xs md:text-sm py-1 px-3 rounded-md transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="py-1 px-3 text-xs md:text-sm text-emerald-500 rounded-md bg-emerald-200 border border-emerald-400 hover:bg-emerald-200/90 active:bg-emerald-200/90 cursor-pointer transition-colors"
          >
            Confirm
          </button>
        </div>
      </form>
    </template>
  </div>
</template>
