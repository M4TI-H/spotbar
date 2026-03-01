import { defineStore } from "pinia";
import type Category from "~/models/Category";
import type MenuItem from "~/models/MenuItem";
import type Section from "~/models/Section";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menu: {} as any,
    menuItems: [] as MenuItem[],
    defaultCurrency: "PLN" as string,
    sections: [] as Section[],
    categories: [] as Category[],
    isLoadingCategories: false as boolean,
  }),
  actions: {
    addToMenu(newItems: MenuItem[]) {
      this.menuItems = [...this.menuItems, ...newItems];
    },
    setSections(sections: Section[]) {
      this.sections = sections;
    },
    saveSection(sectionData: Section) {
      try {
        const index = this.sections.findIndex((s) => s.id === sectionData.id);

        // section exists -> modify
        if (index !== -1) {
          const oldPosition = this.sections[index]?.position;
          const newPosition = sectionData.position;
          if (oldPosition !== newPosition) {
            this.reorderSections(sectionData.id, newPosition);
          }
          this.sections[index] = { ...sectionData };
        }
        // new section -> create
        else {
          const newSection = {
            ...sectionData,
            id: crypto.randomUUID(),
            menu_id: "twoje-id-menu",
          };

          this.sections.forEach((s) => {
            if (s.position >= newSection.position) {
              s.position += 1;
            }
          });

          this.sections.push({ ...newSection });
        }
        this.sections.sort((a, b) => a.position - b.position);

        return true;
      } catch (err: any) {
        console.error(err);
        return false;
      }
    },
    removeSection(id: string) {
      this.menuItems = this.menuItems.filter((item) => item.section_id !== id);
      this.sections = this.sections.filter((item) => item.id !== id);
    },
    reorderSections(sectionId: string, newPosition: number) {
      const section = this.sections.find((s) => s.id === sectionId);
      if (!section) return;

      const oldPosition = section.position;

      this.sections.forEach((s) => {
        if (s.id === sectionId) return;

        //push up
        if (
          newPosition < oldPosition &&
          s.position >= newPosition &&
          s.position < oldPosition
        ) {
          s.position += 1;
        }
        //push down
        else if (
          newPosition > oldPosition &&
          s.position <= newPosition &&
          s.position > oldPosition
        ) {
          s.position -= 1;
        }
      });
    },
    async fetchCategories() {
      if (this.categories.length > 0) return;

      this.isLoadingCategories = true;
      try {
        const data = [
          {
            id: "cat_01",
            name: "Cocktails",
            is_alcoholic: true,
          },
          {
            id: "cat_02",
            name: "Beers",
            is_alcoholic: true,
          },
          {
            id: "cat_03",
            name: "Wine",
            is_alcoholic: true,
          },
          {
            id: "cat_04",
            name: "Soft Drinks",
            is_alcoholic: false,
          },
          {
            id: "cat_05",
            name: "Mocktails",
            is_alcoholic: false,
          },
          {
            id: "cat_06",
            name: "Hard Liquors",
            is_alcoholic: true,
          },
          {
            id: "cat_07",
            name: "Coffee & Tea",
            is_alcoholic: false,
          },
          {
            id: "cat_08",
            name: "Snacks",
            is_alcoholic: false,
          },
        ];
        this.categories = data;
      } catch (err: any) {
        console.log(err);
      } finally {
        this.isLoadingCategories = false;
      }
    },
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
