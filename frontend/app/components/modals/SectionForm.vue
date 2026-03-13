<script setup lang="ts">
import type Section from "~/models/Section";
import { useField } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const menuStore = useMenuStore();
const modalStore = useModalStore();
const localData = ref<Section | null>(null);

const props = defineProps<{
  data?: any;
}>();

const errorWarning = ref<boolean>(false);
const hoverWarning = ref<boolean>(false);

const {
  value: fieldNameValue,
  validate,
  errorMessage,
} = useField<string>(
  "fieldNameValue",
  toTypedSchema(z.string().min(1, "Section name cannot be empty.")),
  {
    initialValue: props.data?.name || "",
  },
);

const handleBlurValidation = async () => {
  fieldNameValue.value = localData.value?.name || "";

  const result = await validate();
  errorWarning.value = !result.valid;
};

watch(
  () => localData.value?.name,
  () => {
    if (errorWarning.value) {
      errorWarning.value = false;
    }
  },
);

const modalTitle = computed(() => {
  if (localData.value?.id) {
    const sectionName = menuStore.sections.find(
      (i) => i.id === localData.value?.id,
    )?.name;
    return `Modify ${sectionName || ""}`;
  }
  return "Add section to the menu";
});

const positionOptions = computed(() => {
  const options = [{ label: "At the top", value: 1 }];

  menuStore.sections.forEach((s) => {
    options.push({
      label: `After ${s.name}`,
      value: s.position + 1,
    });
  });

  if (!props.data) return options;

  return options.filter((opt) => {
    return opt.value !== props.data.position + 1;
  });
});

const handleSubmit = () => {
  if (!localData.value || !localData.value.name?.trim()) return;
  try {
    menuStore.saveSection(localData.value);
    localData.value = null;
    modalStore.close();
    console.log(menuStore.sections);
  } catch (err: any) {
    console.log(err);
  } finally {
    //loading spinner
  }
};

const handleDelete = () => {
  if (!localData.value) return;
  try {
    menuStore.removeSection(localData.value.id);
    localData.value = null;
    modalStore.close();
    console.log(menuStore.sections);
  } catch (err: any) {
    console.log(err);
  } finally {
    //loading spinner
  }
};

onMounted(() => {
  if (props.data) {
    localData.value = { ...props.data };
  } else {
    localData.value = {
      id: "",
      name: "",
      menu_id: "c0abaea2-5328-4ffd-9301-3697e45e3ced",
      description: "",
      position: menuStore.sections.length + 1,
    };
  }
});
</script>
<template>
  <div v-if="localData" class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold text-gray-800">
        {{ modalTitle }}
      </h1>
      <button
        @click="modalStore.close()"
        class="hover:bg-gray-100 px-1 rounded-md transition-colors cursor-pointer"
      >
        <i class="pi pi-times text-gray-400 text-sm"></i>
      </button>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-0.5">
        <div class="relative w-fit flex items-center gap-1 px-2">
          <div
            v-if="hoverWarning"
            class="absolute px-2 py-1 ml-2 mb-9 rounded-md bg-black/50"
          >
            <p class="text-[10px] text-white whitespace-nowrap">
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
            class="text-[10px] font-semibold uppercase text-gray-400 tracking-wider"
            >Name</label
          >
        </div>
        <input
          v-model="localData.name"
          @blur="handleBlurValidation"
          type="text"
          class="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm font-semibold placeholder:font-normal"
          :class="{
            'border-red-400 focus:border-red-500 bg-red-50': errorWarning,
          }"
        />
      </div>

      <div class="flex flex-col gap-0.5">
        <div class="relative w-fit flex items-center gap-1 px-2">
          <!-- <div
          v-if="hoverWarning"
          class="absolute px-2 py-1 ml-2 mb-9 rounded-md bg-black/50"
        >
          <p class="text-[10px] text-white whitespace-nowrap">
            {{ errorMessage }}
          </p>
        </div>
        <i
          v-if="errorWarning"
          @mouseenter="hoverWarning = true"
          @mouseleave="hoverWarning = false"
          class="pi pi-exclamation-circle text-xs text-red-500"
        ></i> -->
          <label
            class="text-[10px] font-semibold uppercase text-gray-400 tracking-wider"
            >Description</label
          >
        </div>
        <textarea
          v-model="localData.description"
          class="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all h-16 text-sm resize-none"
        ></textarea>
      </div>
    </div>
    <div class="w-full flex items-center justify-between pl-2">
      <p class="text-sm text-gray-500">Select position:</p>
      <select
        v-model="localData.position"
        class="pl-2 pr-4 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all text-sm"
      >
        <option
          v-for="opt in positionOptions"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>
    <div
      class="w-full flex items-center gap-4"
      :class="[localData.id ? 'justify-between' : 'justify-end']"
    >
      <button
        v-if="localData.id"
        @click="handleDelete"
        class="py-2 px-3 text-sm text-red-500 rounded-md bg-red-100 border border-red-300 hover:bg-red-200 cursor-pointer transition-colors"
      >
        Delete
      </button>
      <div class="flex items-center gap-4">
        <button
          @click="modalStore.close()"
          class="hover:bg-gray-100 text-gray-400 text-sm py-2 px-3 rounded-md transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="py-2 px-3 text-sm text-emerald-500 rounded-md bg-emerald-100 border border-emerald-300 hover:bg-emerald-200 cursor-pointer transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
