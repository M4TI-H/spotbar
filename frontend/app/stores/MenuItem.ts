import { defineStore } from "pinia";
import type MenuItem from "~/models/MenuItem";

export const useMenuItemStore = defineStore("menuItem", {
  state: () => ({
    isOpened: false as boolean,
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
    openToEdit(data: MenuItem) {
      this.isOpened = true;
      this.data = data;
      if (!this.data.metadata) {
        this.data.metadata = { hidden_fields: [] };
      }
    },
    openEmpty(sectionId?: string) {
      const menuStore = useMenuStore();
      const sectionItems = menuStore.menuItems.filter(
        (i) => i.section_id === sectionId,
      );

      const initialPosition =
        sectionItems.length > 0
          ? Math.max(...sectionItems.map((i) => i.position)) + 1
          : 1;

      this.isOpened = true;
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
    },

    close() {
      this.isOpened = false;
      this.data = null;
    },
    hideAttribute(attribute: string) {},
  },
});
