export default interface MenuItem {
  id: string;
  section_id?: string;
  category: string;
  name: string;
  price: number;
  ingredients?: string[];
  description?: string;
  metadata: MenuItemMetadata | null;
}

export interface MenuItemMetadata {
  hidden_attrs?: string[];
  [key: string]: any;
}
