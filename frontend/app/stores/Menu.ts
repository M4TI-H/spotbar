import { defineStore } from "pinia";
import type MenuItem from "~/models/MenuItem";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menu: [] as MenuItem[],
    defaultCurrency: "" as string,
  }),
  actions: {
    addToMenu(newItems: MenuItem[]) {
      this.menu = [...this.menu, ...newItems];
    },
    async save(updatedItem: MenuItem) {
      try {
        const index = this.menu.findIndex((item) => item.id === updatedItem.id);

        if (index !== -1) {
          this.menu[index] = { ...updatedItem };
          return true;
        }

        return false;
      } catch (err: any) {
        console.error(err);
        return false;
      }
    },
    removeItem(id: string) {
      this.menu = this.menu.filter((item) => item.id !== id);
    },
  },
});
