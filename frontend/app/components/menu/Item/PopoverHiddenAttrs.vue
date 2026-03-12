<script setup lang="ts">
const menuStore = useMenuStore();

const props = defineProps<{
  section_id: string;
}>();

const emit = defineEmits<{
  (e: "action", payload: string): void;
}>();

const popover = ref();

defineExpose({
  toggle: (event: any) => {
    popover.value?.toggle(event);
  },
});

const buttonAction = (scope: "item" | "section" | "menu") => {
  emit("action", scope);
  popover.value.hide();
};
</script>

<template>
  <Popover ref="popover">
    <div
      class="flex flex-col max-w-64 bg-white rounded-md border border-gray-300 shadow-lg"
    >
      <button
        @click="buttonAction('item')"
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
          {{ menuStore.sections.find((s) => s.id === props.section_id)?.name }}
        </span>
      </button>
    </div>
  </Popover>
</template>
