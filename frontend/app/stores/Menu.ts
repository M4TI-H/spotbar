import { defineStore } from "pinia";
import type MenuItem from "~/models/MenuItem";
import type Section from "~/models/Section";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menu: {} as any,
    menuItems: [] as MenuItem[],
    defaultCurrency: "PLN" as string,
    sections: [] as Section[],
  }),
  actions: {
    addToMenu(newItems: MenuItem[]) {
      this.menuItems = [...this.menuItems, ...newItems];
    },
    setSections(sections: Section[]) {
      this.sections = sections;
    },
    addSection(newSection: Section) {
      const targetPos = newSection.position;

      this.sections.forEach((s) => {
        if (s.position >= targetPos) {
          s.position += 1;
        }
      });

      newSection.id = crypto.randomUUID();
      newSection.menu_id = "c0abaea2-5328-4ffd-9301-3697e45e3ced";

      this.sections.push({ ...newSection });
      this.sections.sort((a, b) => a.position - b.position);
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

        return true;
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
