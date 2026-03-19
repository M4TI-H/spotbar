<script setup lang="ts">
import type MenuItem from "~/models/MenuItem";
import type { CustomAttribute } from "~/models/MenuItem";
import SelectSection from "../menu/Item/SelectSection.vue";
import SelectCategory from "../menu/Item/SelectCategory.vue";
import EditableField from "../menu/EditableFields/EditableField.vue";
import CustomAttributeField from "../menu/Item/CustomAttributeField.vue";
import HiddenAttributes from "../menu/Item/HiddenAttributes.vue";

const menuItemStore = useMenuItemStore();
const menuStore = useMenuStore();
const modalStore = useModalStore();

const props = defineProps<{
  data?: any;
}>();

const isSimpleField = (value: any) => {
  if (value === null) return true;
  return typeof value === "string" || typeof value === "number";
};

const initialName = ref<string>("");
const localData = ref<MenuItem | null>(null);

const getSuffix = (key: string) => {
  if (key === "price") return menuStore.defaultCurrency;

  const customAttr = localData.value?.metadata?.[key];
  if (customAttr && customAttr.suffix) {
    return customAttr.suffix;
  }

  return undefined;
};

//pending attributes that will be added to other items after form submission
const pendingGlobalAttributes = ref<CustomAttribute[]>([]);

const addCustomField = (attr: CustomAttribute) => {
  if (!localData.value) return;

  const key = attr.label.toLowerCase().replace(/\s+/g, "_");
  const defaultValue = attr.type === "number" ? 0 : "";

  if (!localData.value.metadata) {
    localData.value.metadata = { hidden_attrs: [] };
  }

  (localData.value as any)[key] = defaultValue;
  localData.value.metadata[key] = {
    type: attr.type,
    suffix: attr.suffix.trim(),
    label: attr.label.trim(),
    visibility: attr.visibility,
  };

  if (attr.visibility !== "single") {
    pendingGlobalAttributes.value.push({ ...attr });
  }
};

const pendingAttributeDeletions = ref<{ field: string; scope: string }[]>([]);
const pendingAttributeDuplications = ref<{ field: string; scope: string }[]>(
  [],
);
const pendingAttributesToHide = ref<{ field: string; scope: string }[]>([]);
const pendingAttributesToUnhide = ref<{ field: string; scope: string }[]>([]);

const handleAttributeAction = (payload: {
  mode: string;
  scope: string;
  field: string;
}) => {
  if (!payload || !payload.mode) {
    console.error("Missing payload in handleAttributeAction");
    return;
  }

  const fieldName = payload.field;

  if (payload.mode === "delete") {
    //remove local copy of deleted data
    if (localData.value) {
      if (fieldName in localData.value) {
        delete (localData.value as any)[fieldName];
      }
      if (localData.value.metadata && localData.value.metadata[fieldName]) {
        delete localData.value.metadata[fieldName];
      }
    }

    // add to list of attributes pending to deletion
    if (payload.scope !== "item") {
      pendingAttributeDeletions.value.push({
        field: fieldName,
        scope: payload.scope,
      });
    }

    // remove from pending new attribute list
    pendingGlobalAttributes.value = pendingGlobalAttributes.value.filter(
      (attr) => attr.label.toLowerCase().replace(/\s+/g, "_") !== fieldName,
    );
  } else if (payload.mode === "duplicate") {
    if (payload.scope !== "item") {
      pendingAttributeDuplications.value =
        pendingAttributeDuplications.value.filter(
          (dup) => dup.field !== fieldName,
        );

      pendingAttributeDuplications.value.push({
        field: fieldName,
        scope: payload.scope,
      });
    }
    pendingAttributeDeletions.value = pendingAttributeDeletions.value.filter(
      (del) => del.field !== fieldName,
    );
  } else if (payload.mode === "hide") {
    if (localData.value) {
      if (!localData.value.metadata) {
        localData.value.metadata = { hidden_attrs: [] };
      }
      if (!localData.value.metadata.hidden_attrs) {
        localData.value.metadata.hidden_attrs = [];
      }

      //add to hidden_attrs if not there yet
      if (!localData.value.metadata.hidden_attrs.includes(fieldName)) {
        localData.value.metadata.hidden_attrs.push(fieldName);
      }

      if (payload.scope !== "item") {
        pendingAttributesToHide.value = pendingAttributesToHide.value.filter(
          (h) => h.field !== fieldName,
        );

        pendingAttributesToHide.value.push({
          field: fieldName,
          scope: payload.scope,
        });
      }
    }
  } else if (payload.mode === "unhide") {
    if (localData.value && localData.value.metadata?.hidden_attrs) {
      localData.value.metadata.hidden_attrs =
        localData.value.metadata.hidden_attrs.filter(
          (key) => key !== fieldName,
        );

      if (payload.scope !== "item") {
        pendingAttributesToUnhide.value =
          pendingAttributesToUnhide.value.filter((u) => u.field !== fieldName);

        pendingAttributesToUnhide.value.push({
          field: fieldName,
          scope: payload.scope,
        });
      }

      // Ważne: Jeśli to pole miało być ukryte (zanim kliknięto Save), wywalamy je z poczekalni ukrywania
      pendingAttributesToHide.value = pendingAttributesToHide.value.filter(
        (h) => h.field !== fieldName,
      );
    }
  }
};

const saveChanges = async () => {
  if (!localData.value) return;

  try {
    const success = await menuStore.save(localData.value);

    if (success) {
      //unhide pending attributes
      pendingAttributesToUnhide.value.forEach((toUnhide) => {
        menuStore.unhideAttribute(
          localData.value!.id,
          toUnhide.field,
          toUnhide.scope as any,
          localData.value?.section_id ?? "",
        );
      });

      //delete pending attributes
      pendingAttributeDeletions.value.forEach((toDelete) => {
        menuStore.deleteAttribute(
          localData.value!.id,
          toDelete.field,
          toDelete.scope as any,
          localData.value?.section_id ?? "",
        );
      });

      //hide pending attributes
      pendingAttributesToHide.value.forEach((toHide) => {
        menuStore.hideAttribute(
          localData.value!.id,
          toHide.field,
          toHide.scope as any,
          localData.value?.section_id ?? "",
        );
      });

      //add pending attributes
      pendingGlobalAttributes.value.forEach((attr) => {
        const key = attr.label.toLowerCase().replace(/\s+/g, "_");
        const currentValue = (localData.value as any)[key];

        const applyToItem = (item: any) => {
          if (!item.metadata) item.metadata = { hidden_attrs: [] };
          item[key] = currentValue;
          item.metadata[key] = { ...attr };
        };

        if (attr.visibility === "section") {
          const sectionId = localData.value!.section_id;
          menuStore.menuItems
            .filter(
              (i) => i.section_id === sectionId && i.id !== localData.value?.id,
            )
            .forEach(applyToItem);
        } else if (attr.visibility === "all") {
          menuStore.menuItems
            .filter((i) => i.id !== localData.value?.id)
            .forEach(applyToItem);
        }
      });

      //duplicate values of pending attributes
      pendingAttributeDuplications.value.forEach((duplication) => {
        const key = duplication.field;
        const currentValue = (localData.value as any)[key];
        const existingMeta = localData.value?.metadata?.[key];

        menuStore.duplicateAttributeValue(
          key,
          duplication.scope as any,
          localData.value?.section_id ?? "",
          currentValue,
          existingMeta,
        );
      });
    }

    pendingAttributesToUnhide.value = [];
    pendingGlobalAttributes.value = [];
    pendingAttributeDeletions.value = [];
    pendingAttributeDuplications.value = [];

    modalStore.close();
  } catch (err: any) {
    console.error("Save failed:", err);
  }
};

const getFieldType = (value: any) => {
  if (typeof value === "number") return "number";
  return "text";
};

//initial values copy
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      const copy = JSON.parse(JSON.stringify(newData));

      if (typeof copy.price === "number") {
        copy.price = Math.round(copy.price * 100) / 100;
      }

      localData.value = copy;
    } else {
      localData.value = null;
    }
  },
  { immediate: true },
);

const hiddenAttributesList = computed(() => {
  const hiddenKeys = localData.value?.metadata?.hidden_attrs;
  if (!hiddenKeys || !hiddenKeys.length || !localData.value) return [];

  return hiddenKeys.map((key) => {
    const value = (localData.value as any)[key];

    const meta = localData.value?.metadata?.[key];

    return {
      key: key,
      label: meta?.label,
      value: value,
      suffix: meta?.suffix || "",
    };
  });
});

onMounted(() => {
  if (localData.value && localData.value.name !== "") {
    initialName.value = localData.value.name;
  }
});
</script>

<template>
  <div
    v-if="localData"
    class="w-full max-w-4xl bg-stone-800 border border-stone-700 rounded-xl flex flex-col z-50 max-h-[90vh] md:max-h-320"
  >
    <div
      class="flex items-center justify-between border-b border-stone-700 p-3 md:p-4"
    >
      <h1 class="md:text-xl font-semibold text-stone-300 max-w-[70vw] truncate">
        {{ initialName ? `Modifying ${initialName}` : "New menu item" }}
      </h1>
      <button
        @click="modalStore.close()"
        class="hover:bg-stone-900/40 px-1 rounded-md transition-colors cursor-pointer"
      >
        <i class="pi pi-times text-stone-300 text-sm"></i>
      </button>
    </div>

    <div class="p-4 overflow-y-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectSection v-model="localData.section_id" />
        <SelectCategory v-model="localData.category_id" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        <template v-for="(value, key) in localData" :key="key">
          <EditableField
            v-if="
              !localData.metadata?.hidden_attrs?.includes(String(key)) &&
              isSimpleField(value) &&
              key !== 'id' &&
              key !== 'section_id' &&
              key !== 'category_id' &&
              key !== 'position' &&
              key !== 'description' &&
              key !== 'ingredients' &&
              key !== 'metadata'
            "
            :item_id="localData.id"
            :label="String(key)"
            :type="getFieldType(value)"
            :suffix="getSuffix(String(key))"
            :section_id="localData.section_id"
            v-model="localData[key]"
            @attributeAction="handleAttributeAction"
          />
        </template>

        <MenuEditableFieldsDescription v-model="localData.description" />
        <MenuEditableFieldsIngredients v-model="localData.ingredients" />
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <CustomAttributeField @addAttribute="addCustomField" />
      <HiddenAttributes
        v-if="localData.metadata?.hidden_attrs?.length"
        :attributes="hiddenAttributesList"
        :section_id="localData.section_id!"
        @unhide="handleAttributeAction"
      />
    </div>

    <div
      class="px-2 md:px-6 py-3 md:py-2 border-t border-stone-700 flex justify-center md:justify-end gap-3"
    >
      <button
        @click="modalStore.close()"
        class="px-8 py-3 md:py-2 w-1/3 md:w-auto bg-stone-700 text-white rounded-md hover:bg-stone-600/90 transition-all font-semibold text-sm cursor-pointer"
      >
        Cancel
      </button>
      <button
        @click="saveChanges"
        class="px-8 py-3 md:py-2 w-2/3 md:w-auto bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all font-semibold text-sm cursor-pointer"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>
