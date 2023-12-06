import { ProductCategory } from "@/features/product-categories/types";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  productCategoryId: number;
  productCategory: ProductCategory;
  ProductMaterial: ProductMaterial[];
  capital: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductMaterial {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface BestSellingProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  productCategoryId: number;
  createdAt: Date;
  updatedAt: Date;
  totalQuantitySold: number;
}
