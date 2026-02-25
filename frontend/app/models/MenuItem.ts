export default interface MenuItem {
  id: string;
  category: string;
  name: string;
  price?: number;
  ingredients?: string[];
  description?: string;
  section?: string;
  metadata: MenuItemMetadata | null;
}

export interface MenuItemMetadata {
  hidden_attrs?: string[];
  [key: string]: any;
}
