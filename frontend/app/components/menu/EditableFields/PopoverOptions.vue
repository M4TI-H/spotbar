<script setup lang="ts">
const popover = ref();

const internalPopover = ref();
const popoverMode = ref<string>("");

defineProps<{
  section: string | null;
}>();

defineExpose({
  toggle: (event: any) => {
    popover.value?.toggle(event);
  },
});

const showInternal = (event: any, mode: string) => {
  popoverMode.value = mode;

  internalPopover.value?.show(event);
};

const buttonAction = (type: string) => {
  if (popoverMode.value === "duplicate") {
  }
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
        @mouseenter="showInternal($event, 'hide')"
        class="w-full py-2 px-3 rounded-t-md text-left text-xs text-gray-500 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
      >
        <i class="pi pi-eye-slash"></i>
        <div class="w-full flex items-center justify-between min-w-0">
          <span>Hide attribute in</span>
          <i class="pi pi-chevron-right text-[8px]"></i>
        </div>
      </button>
    </div>
    <Popover ref="internalPopover" :pt="{ root: { class: 'ml-44' } }">
      <div
        class="flex flex-col max-w-64 bg-white rounded-md border border-gray-300 shadow-lg"
      >
        <button
          @click="buttonAction('single')"
          v-if="popoverMode == 'hide'"
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
            {{ section }}
          </span>
        </button>
      </div>
    </Popover>
  </Popover>
</template>
