export default interface Section {
  id: string; //UUID
  menu_id: string; //UUID
  name: string;
  description: string;
  position: number;
  metadata?: {
    hidden_attrs?: string[];
  };
}
