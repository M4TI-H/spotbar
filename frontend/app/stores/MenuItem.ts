import { defineStore } from "pinia";
import type MenuItem from "~/models/MenuItem";

export const useMenuItemStore = defineStore("menuItem", {
  state: () => ({
    isOpened: false as boolean,
    data: null as MenuItem | null,
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
      this.isOpened = true;
      this.data = {
        id: crypto.randomUUID(),
        section_id: sectionId || "",
        category_id: "",
        name: "",
        price: 0,
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
