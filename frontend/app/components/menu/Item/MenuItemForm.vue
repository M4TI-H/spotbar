<script setup lang="ts">
import type MenuItem from "~/models/MenuItem";
import EditableField from "../EditableFields/EditableField.vue";
import SelectSection from "./SelectSection.vue";
import SelectCategory from "./SelectCategory.vue";
import CustomAttributeField from "./CustomAttributeField.vue";
import type { CustomAttribute } from "~/models/MenuItem";

const menuItemStore = useMenuItemStore();
const menuStore = useMenuStore();

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
    suffix: attr.suffix,
    label: attr.label,
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
  }
};

const saveChanges = async () => {
  if (!localData.value) return;

  try {
    const success = await menuStore.save(localData.value);

    if (success) {
      //delete pending attributes
      pendingAttributeDeletions.value.forEach((toDeletion) => {
        menuStore.deleteAttribute(
          localData.value!.id,
          toDeletion.field,
          toDeletion.scope as any,
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
          localData.value!.id,
          key,
          duplication.scope as any,
          localData.value?.section_id ?? "",
          currentValue,
          existingMeta,
        );
      });
    }

    pendingGlobalAttributes.value = [];
    pendingAttributeDeletions.value = [];
    pendingAttributeDuplications.value = [];

    menuItemStore.close();
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
  () => menuItemStore.data,
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

onMounted(() => {
  if (localData.value && localData.value.name !== "") {
    initialName.value = localData.value.name;
  }
});
</script>

<template>
  <section
    class="w-screen h-screen z-100 fixed bg-black/40 flex items-center justify-center p-4"
  >
    <div
      v-if="localData"
      class="w-full max-w-4xl bg-white border border-gray-400 rounded-md flex flex-col"
    >
      <div class="flex items-center justify-between p-4">
        <h1 class="text-xl font-semibold text-gray-800">
          {{ initialName ? `Modifying ${initialName}` : "New menu item" }}
        </h1>
        <button
          @click="menuItemStore.close()"
          class="hover:bg-gray-100 px-1 rounded-md transition-colors cursor-pointer"
        >
          <i class="pi pi-times text-gray-400 text-sm"></i>
        </button>
      </div>

      <div class="p-4 overflow-y-auto max-h-[80vh]">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectSection v-model="localData.section_id" />
          <SelectCategory v-model="localData.category_id" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <template v-for="(value, key) in localData" :key="key">
            <EditableField
              v-if="
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

          <div class="md:col-span-3 flex flex-col gap-1">
            <label
              class="text-[10px] font-bold uppercase text-gray-400 tracking-wider ml-1"
              >Description</label
            >
            <textarea
              v-model="localData.description"
              class="w-full px-3 py-2 b border border-gray-300 rounded-md focus:border-emerald-500 outline-0 transition-all h-20 text-sm resize-none"
              placeholder="Describe this item..."
            ></textarea>
          </div>

          <div
            v-if="localData.ingredients"
            class="md:col-span-3 flex flex-col gap-1"
          >
            <label
              class="text-[10px] font-bold uppercase text-gray-400 tracking-wider ml-1"
              >Ingredients</label
            >
            <textarea
              :value="localData.ingredients.join(', ')"
              @input="
                (e) =>
                  (localData!.ingredients = (
                    e.target as HTMLTextAreaElement
                  ).value
                    .split(',')
                    .map((s) => s.trim()))
              "
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-500 outline-0 h-16 text-sm resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="w-full flex items-center gap-2">
        <div class="w-1/30 h-px bg-gray-300"></div>
        <h2 class="text-gray-500 uppercase whitespace-nowrap">
          Custom attributes
        </h2>
        <div class="w-full h-px bg-gray-300"></div>
      </div>
      <div class="p-2">
        <CustomAttributeField @addAttribute="addCustomField" />
      </div>

      <div
        class="px-6 py-2 border-t border-gray-200 flex justify-end gap-3 mt-4"
      >
        <button
          @click="menuItemStore.close()"
          class="hover:bg-gray-100 text-gray-400 px-3 rounded-md transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="saveChanges"
          class="px-8 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all font-semibold text-sm cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  </section>
</template>
