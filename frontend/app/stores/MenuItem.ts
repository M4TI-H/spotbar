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
    open(data: MenuItem) {
      this.isOpened = true;
      this.data = data;
      if (!this.data.metadata) {
        this.data.metadata = { hidden_fields: [] };
      }
    },
    close() {
      this.isOpened = false;
      this.data = null;
    },
    hideAttribute(attribute: string) {},
  },
});
