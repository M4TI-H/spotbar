import { defineStore } from "pinia";
import ItemForm from "~/components/modals/ItemForm.vue";
import type MenuItem from "~/models/MenuItem";

export const useMenuItemStore = defineStore("menuItem", {
  state: () => ({
    data: null as MenuItem | null,
    changesMade: false as boolean,
  }),
  getters: {
    isAttributeHidden:
      (state) =>
      (attribute: string): boolean => {
        const hiddenFields = state.data?.metadata?.hidden_fields;
        return Array.isArray(hiddenFields)
          ? hiddenFields.includes(attribute)
          : false;
      },
  },
  actions: {
    openEmptyForm(sectionId?: string) {
      const menuStore = useMenuStore();
      const modalStore = useModalStore();
      const sectionItems = menuStore.menuItems.filter(
        (i) => i.section_id === sectionId,
      );

      const initialPosition =
        sectionItems.length > 0
          ? Math.max(...sectionItems.map((i) => i.position)) + 1
          : 1;

      this.data = {
        id: crypto.randomUUID(),
        section_id: sectionId || "",
        category_id: "",
        name: "",
        price: 0,
        position: initialPosition,
        ingredients: [],
        description: "",
        metadata: {
          hidden_attrs: [],
        },
      };

      const emptyItemData = this.data;

      modalStore.open(ItemForm, {
        data: emptyItemData,
      });
    },
  },
});
