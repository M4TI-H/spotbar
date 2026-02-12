export default interface MenuItem {
  id: string;
  category: string;
  name: string;
  price?: number;
  ingredients?: string[];
  description?: string;
  section?: string;
}
