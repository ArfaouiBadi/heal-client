// types.ts
export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  name: string;
  id: string;
  subcategories: Subcategory[];
}
export interface CategoryObj {
  label: string;
  code: string;
  items: { label: string; value: string }[];
}
