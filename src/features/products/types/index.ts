import { ProductCategory } from "@/features/product-categories/types";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  productCategoryId: number;
  productCategory: ProductCategory;
  createdAt: Date;
  updatedAt: Date;
}
