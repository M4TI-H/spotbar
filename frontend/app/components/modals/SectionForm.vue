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
  if (errorWarning.value) return;

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
  <div
    v-if="localData"
    class="relative w-full max-w-lg bg-stone-800 border border-stone-700 rounded-md overflow-hidden flex flex-col gap-4"
  >
    <div
      class="flex items-center justify-between border-b border-stone-700 p-3 md:p-4"
    >
      <h1 class="md:text-xl font-semibold text-stone-300 max-w-[70vw] truncate">
        {{ modalTitle }}
      </h1>
      <button
        @click="modalStore.close()"
        class="hover:bg-stone-900/40 px-1 rounded-md transition-colors cursor-pointer"
      >
        <i class="pi pi-times text-stone-300 text-sm"></i>
      </button>
    </div>
    <div class="flex flex-col gap-4 px-4">
      <div class="flex flex-col gap-0.5">
        <div class="relative w-fit flex items-center gap-1 px-1">
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
            class="text-xs lg:text-sm font-semibold capitalize text-gray-400"
            >Name</label
          >
        </div>
        <input
          v-model="localData.name"
          @blur="handleBlurValidation"
          type="text"
          class="w-full px-3 py-2 text-stone-300 border border-stone-700 rounded-md focus:border-emerald-600 outline-0 transition-all text-sm font-semibold placeholder:font-normal"
          :class="{
            'border-red-400! focus:border-red-500': errorWarning,
          }"
        />
      </div>

      <div class="flex flex-col gap-0.5">
        <div class="relative w-fit flex items-center gap-1 px-1">
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
            class="text-xs md:text-sm font-semibold capitalize text-stone-400"
            >Description</label
          >
        </div>
        <textarea
          v-model="localData.description"
          class="w-full px-3 py-2 border text-stone-300 border-stone-700 rounded-md focus:border-emerald-600 outline-0 transition-all h-20 text-sm resize-none"
        ></textarea>
      </div>
    </div>
    <div
      class="w-full flex flex-col md:flex-row items-start md:items-center md:justify-between gap-0.5 pl-4 md:pl-6 pr-4"
    >
      <p class="text-xs md:text-sm font-semibold text-stone-400 ml-1 md:ml-0">
        Select position:
      </p>
      <select
        v-model="localData.position"
        class="pl-2 pr-4 py-2 border border-stone-700 rounded-md focus:border-emerald-600 text-gray-300 outline-0 transition-all text-sm"
      >
        <option
          v-for="opt in positionOptions"
          :key="opt.value"
          :value="opt.value"
          class="text-stone-300"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>
    <div
      class="w-full flex items-center gap-4 px-4 border-t border-stone-700"
      :class="[localData.id ? 'justify-between' : 'justify-end']"
    >
      <button
        v-if="localData.id"
        @click="handleDelete"
        class="py-2 px-3 text-sm text-stone-300 rounded-md border border-red-600 hover:bg-red-600 active:bg-red-600 cursor-pointer transition-colors"
      >
        <i class="pi pi-trash"></i>
      </button>
      <div class="w-full py-3 md:py-2 flex justify-center md:justify-end gap-3">
        <button
          @click="modalStore.close()"
          class="px-8 py-3 md:py-2 w-1/3 md:w-auto bg-stone-700 text-white rounded-md hover:bg-stone-600/90 active:bg-stone-600/90 transition-all font-semibold text-sm cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="px-8 py-3 md:py-2 w-2/3 md:w-auto bg-emerald-600 text-white rounded-md hover:bg-emerald-700 active:bg-emerald-700 transition-all font-semibold text-sm cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>
