export default interface MenuItem {
  id: string;
  section_id?: string;
  category_id: string;
  name: string;
  price: number;
  position: number;
  ingredients?: string[];
  description?: string;
  metadata: MenuItemMetadata | null;
}

export interface MenuItemMetadata {
  hidden_attrs?: string[];
  [key: string]: any;
}

export interface CustomAttribute {
  label: string;
  type: string;
  suffix: string;
  value: string | number;
  visibility: string;
}
