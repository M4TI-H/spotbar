<script setup lang="ts">
import PopoverOptions from "./PopoverOptions.vue";

const model = defineModel<string | number>();

defineProps<{
  item_id: string;
  label: string;
  type: string;
  isHideable?: boolean;
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
    <div class="w-full flex items-center justify-between px-1">
      <label
        class="text-[10px] font-semibold uppercase text-gray-400 tracking-wider"
        >{{ label.replace("_", " ") }}</label
      >
      <button
        @click="toggleOptions"
        class="hover:bg-gray-100 px-1 rounded-md transition-colors cursor-pointer"
      >
        <i class="pi pi-ellipsis-h text-xs text-gray-400"></i>
      </button>
      <PopoverOptions
        ref="popoverRef"
        :item_id="item_id"
        :section_id="section_id ? section_id : null"
        :field_label="label"
        @action="handleAction"
      />
    </div>
    <MenuEditableFieldsText v-if="type === 'text'" v-model="model" />
    <MenuEditableFieldsPrice
      v-if="type === 'number'"
      v-model="model as any"
      :suffix="suffix"
    />
  </div>
</template>
