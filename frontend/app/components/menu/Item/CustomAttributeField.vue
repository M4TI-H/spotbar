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
          @click="startEditing"
          class="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-200 text-gray-400 hover:border-emerald-300 hover:text-emerald-600 rounded-md transition-all text-xs font-semibold cursor-pointer w-fit"
        >
          <span>+</span> ADD CUSTOM ATTRIBUTE (GLASS, METHOD, ETC.)
        </button>
      </template>
      <template v-else-if="newAttribute">
        <form
          @submit.prevent="handleConfirmNewAttribute"
          class="w-full flex flex-col gap-2"
        >
          <div class="w-sm flex gap-2">
            <button
              v-for="scope in ['all', 'section', 'single']"
              :key="scope"
              type="button"
              @click="newAttribute.visibility = scope"
              class="py-1 w-1/3 text-sm font-semibold border rounded-md cursor-pointer transition-all"
              :class="
                newAttribute.visibility === scope
                  ? 'bg-sky-100 border-sky-300 text-sky-500 shadow-sm'
                  : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'
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
            <div class="w-sm relative">
              <input
                v-model="labelValue"
                type="text"
                maxlength="30"
                class="w-full pl-3 pr-6 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm text-gray-700"
                placeholder="Attribute label"
              />
              <p
                class="absolute right-2 top-1/2 -translate-y-1/2 tracking-tight text-xs text-gray-500 pointer-events-none"
              >
                {{ newAttribute.label.length }}/30
              </p>
            </div>

            <div class="w-sm px-2 flex items-center justify-between">
              <p class="w-fit text-gray-400 text-[12px]">
                i.e. glass type, age, ABV.
              </p>
              <p v-if="labelError" class="text-red-500 text-[12px]">
                {{ labelError }}
              </p>
            </div>
          </div>

          <div class="w-sm flex items-center gap-2">
            <button
              type="button"
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
              type="button"
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
              v-model="suffixValue"
              type="text"
              maxlength="10"
              class="w-full px-3 py-1 border border-gray-300 rounded-md focus:border-emerald-300 outline-0 text-sm text-gray-700 bg-white"
              placeholder="Suffix (optional)"
            />
          </div>
          <div class="w-sm flex items-center gap-2 justify-end">
            <button
              type="button"
              @click="handleResetValue"
              class="hover:bg-gray-100 text-gray-400 text-sm py-1 px-3 rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="py-1 px-3 text-sm text-emerald-500 rounded-md bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 cursor-pointer transition-colors"
            >
              Confirm
            </button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>
