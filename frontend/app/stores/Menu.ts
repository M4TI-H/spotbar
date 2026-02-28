import { defineStore } from "pinia";
import type MenuItem from "~/models/MenuItem";
import type Section from "~/models/Section";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menuItems: [] as MenuItem[],
    defaultCurrency: "PLN" as string,
    sections: [] as Partial<Section>[],
  }),
  actions: {
    addToMenu(newItems: MenuItem[]) {
      this.menuItems = [...this.menuItems, ...newItems];
    },
    setSections(sections: Section[]) {
      this.sections = sections;
    },
    addSection(newSection: Section) {
      this.sections.push(newSection);
    },
    removeSection() {},
    async save(updatedItem: MenuItem) {
      try {
        const index = this.menuItems.findIndex(
          (item) => item.id === updatedItem.id,
        );

        if (index !== -1) {
          this.menuItems[index] = { ...updatedItem };
        } else {
          // create new item if it does not exist
          this.menuItems.push({ ...updatedItem });
        }

        return false;
      } catch (err: any) {
        console.error(err);
        return false;
      }
    },
    removeItem(id: string) {
      this.menuItems = this.menuItems.filter((item) => item.id !== id);
    },
  },
});
