import { defineStore } from "pinia";
import type MenuItem from "~/models/MenuItem";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menu: [] as MenuItem[],
  }),
  actions: {
    addToMenu(newItems: MenuItem[]) {
      this.menu = [...this.menu, ...newItems];
    },
    save(updatedItem: MenuItem) {
      const index = this.menu.findIndex((item) => item.id === updatedItem.id);

      if (index !== -1) {
        this.menu[index] = { ...updatedItem };
      }
    },
    removeItem(id: string) {
      this.menu = this.menu.filter((item) => item.id !== id);
    },
  },
});
