<script setup lang="ts">
const menuStore = useMenuStore();

const popover = ref();
const internalPopover = ref();
const popoverMode = ref<string>("");

const props = defineProps<{
  item_id: string;
  section_id: string | null;
  field_label: string;
}>();

const emit = defineEmits<{
  (e: "action", payload: any): void;
}>();

const field_type = computed(() => {
  if (!props.field_label) return null;
  return props.field_label.toLowerCase().replace(/\s+/g, "_");
});

const requiredType = computed(() => {
  const requiredTypes = ["name", "price"];

  if (!field_type.value) return false;

  return requiredTypes.includes(field_type.value);
});

defineExpose({
  toggle: (event: any) => {
    popover.value?.toggle(event);
  },
});

const showInternal = (event: any, mode: string) => {
  popoverMode.value = mode;

  internalPopover.value?.show(event);
};

const buttonAction = (range: "item" | "section" | "menu") => {
  if (!field_type.value) return;

  emit("action", {
    mode: popoverMode.value,
    scope: range,
    field: field_type.value,
  });

  popover.value.hide();
  internalPopover.value.hide();
};
</script>

<template>
  <Popover ref="popover">
    <div
      class="flex flex-col w-44 bg-white rounded-md border border-gray-300 shadow-lg"
    >
      <button
        @mouseenter="showInternal($event, 'duplicate')"
        class="w-full py-2 px-3 rounded-b-md text-left text-xs text-gray-500 hover:bg-gray-50 border-t border-gray-100 flex items-center gap-2 cursor-pointer"
      >
        <i class="pi pi-clone"></i>

        <div class="w-full flex items-center justify-between min-w-0">
          <span>Duplicate value in</span>
          <i class="pi pi-chevron-right text-[8px]"></i>
        </div>
      </button>

      <button
        v-if="!requiredType"
        @mouseenter="showInternal($event, 'hide')"
        class="w-full py-2 px-3 rounded-t-md text-left text-xs text-gray-500 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
      >
        <i class="pi pi-eye-slash"></i>
        <div class="w-full flex items-center justify-between min-w-0">
          <span>Hide attribute in</span>
          <i class="pi pi-chevron-right text-[8px]"></i>
        </div>
      </button>
      <button
        v-if="!requiredType"
        @mouseenter="showInternal($event, 'delete')"
        class="w-full py-2 px-3 rounded-t-md text-left text-xs text-red-500 bg-red-100 hover:bg-red-200 flex items-center gap-2 cursor-pointer"
      >
        <i class="pi pi-eye-slash"></i>
        <div class="w-full flex items-center justify-between min-w-0">
          <span>Delete attribute in</span>
          <i class="pi pi-chevron-right text-[8px]"></i>
        </div>
      </button>
    </div>
    <Popover ref="internalPopover" :pt="{ root: { class: 'ml-44' } }">
      <div
        class="flex flex-col max-w-64 bg-white rounded-md border border-gray-300 shadow-lg"
      >
        <button
          @click="buttonAction('item')"
          v-if="popoverMode !== 'duplicate'"
          class="w-full py-2 px-3 rounded-b-md text-left text-xs text-gray-500 hover:bg-gray-50 border-t border-gray-100 flex items-center gap-2 cursor-pointer"
        >
          This item only
        </button>
        <button
          @click="buttonAction('menu')"
          class="w-full py-2 px-3 rounded-b-md text-left text-xs text-gray-500 hover:bg-gray-50 border-t border-gray-100 flex items-center gap-2 cursor-pointer"
        >
          Whole menu
        </button>
        <button
          @click="buttonAction('section')"
          class="w-full py-2 px-3 rounded-b-md text-left text-xs text-gray-500 hover:bg-gray-50 border-t border-gray-100 flex items-center gap-2 cursor-pointer"
        >
          <span class="font-semibold text-emerald-600 truncate">
            {{ menuStore.sections.find((s) => s.id === section_id)?.name }}
          </span>
        </button>
      </div>
    </Popover>
  </Popover>
</template>
