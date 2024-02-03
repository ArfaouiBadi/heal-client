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
export interface Product {
  marque: string;
}
export interface Brand {
  name: string;
  image: string;
}
export interface ProductDataSet {
  id: string;
  productName: string;
  price: number;
  image: string;
  category: Category;
  subcategory: Subcategory;
  marque: string;
  quantity: number;
  reviews: number;
  CategoryObj: CategoryObj;
  inventoryStatus: { label: string; value: string };
  expirationDate: string;
  usageInstructions: string;
  prescription: boolean;
  categoryId: string;
  subcategoryId: string;
  status: string;
  qty?: number;
}
export interface Cart {
  cartId: string;
  products: Array<ProductDataSet>;
}
export interface Plan {
  planId: string;
  productName: string;
  price: number;
  qty: number;
}
export interface User {
  id: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  plan: string;
}
