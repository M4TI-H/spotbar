<script setup lang="ts">
import PopoverOptions from "./PopoverOptions.vue";
import { useField } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const model = defineModel<string | number>();

const props = defineProps<{
  item_id: string;
  label: string;
  type: string;
  suffix?: string;
  section_id?: string;
}>();

const emit = defineEmits<{
  (
    e: "attributeAction",
    payload: { mode: string; scope: string; field: string },
  ): void;
}>();

const popoverRef = ref();
const errorWarning = ref<boolean>(false);
const hoverWarning = ref<boolean>(false);

const fieldSchema = computed(() => {
  if (props.type === "text") {
    return toTypedSchema(z.string().min(1, "Field cannot be empty."));
  } else if (props.type === "number") {
    return toTypedSchema(z.number().min(0, "Value cannot be negative."));
  }
  return toTypedSchema(z.any());
});

const {
  value: fieldValue,
  validate,
  errorMessage,
} = useField<string | number>("fieldValue", fieldSchema, {
  initialValue: model.value,
});

const handleBlurValidation = async () => {
  fieldValue.value = model.value as string | number;

  const result = await validate();

  errorWarning.value = !result.valid;
};

watch(model, () => {
  if (errorWarning.value) {
    errorWarning.value = false;
  }
});

const toggleOptions = (event: any) => {
  popoverRef.value?.toggle(event);
};

const handleAction = (payload: {
  mode: string;
  scope: string;
  field: string;
}) => {
  emit("attributeAction", payload);
};
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <div class="w-full flex items-center justify-between px-1 shadow-lg">
      <div class="relative w-fit flex items-center gap-1">
        <div
          v-if="hoverWarning"
          class="absolute px-2 py-1 ml-2 mb-9 rounded-md bg-black/50"
        >
          <p class="text-xs text-white whitespace-nowrap">
            {{ errorMessage }}
          </p>
        </div>
        <i
          v-if="errorWarning"
          @mouseenter="hoverWarning = true"
          @mouseleave="hoverWarning = false"
          class="pi pi-exclamation-circle text-xs text-red-500"
        ></i>
        <label
          class="text-xs lg:text-sm font-semibold capitalize text-stone-400"
          :class="{ 'text-red-500': errorWarning }"
          >{{ label.replace("_", " ") }}</label
        >
      </div>

      <button
        @click="toggleOptions"
        class="hover:bg-stone-900/40 active:bg-stone-900/40 px-1 rounded-md transition-colors cursor-pointer"
      >
        <i class="pi pi-ellipsis-h text-xs text-stone-400"></i>
      </button>
      <PopoverOptions
        ref="popoverRef"
        :item_id="item_id"
        :section_id="section_id ? section_id : null"
        :field_label="label"
        @action="handleAction"
      />
    </div>
    <MenuEditableFieldsText
      v-if="type === 'text'"
      v-model="model"
      :error="errorWarning"
      @focusout="handleBlurValidation"
    />
    <MenuEditableFieldsPrice
      v-if="type === 'number' && label === 'price'"
      v-model="model as any"
      :suffix="suffix"
      :error="errorWarning"
      @focusout="handleBlurValidation"
    />

    <MenuEditableFieldsNumber
      v-if="type === 'number' && label !== 'price'"
      v-model="model as any"
      :suffix="suffix"
      :error="errorWarning"
      @focusout="handleBlurValidation"
    />
  </div>
</template>
