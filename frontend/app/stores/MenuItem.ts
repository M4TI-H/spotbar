import { defineStore } from "pinia";
import type { MenuItem } from "primevue/menuitem";

export const useMenuItemStore = defineStore("menuItem", {
  state: () => ({
    isOpened: false as boolean,
    data: null as MenuItem | null,
    defaultCurrency: "PLN" as string,
  }),
  actions: {
    open(data: MenuItem) {
      this.isOpened = true;
      this.data = data;
    },
    close() {
      this.isOpened = false;
      this.data = null;
    },
    save() {
      console.log("Changes saved.");
      console.log(this.data);
      this.close();
    },
  },
});
