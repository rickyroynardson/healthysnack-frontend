import { Product } from "@/features/products/types";

export interface Sale {
  id: number;
  invoiceNumber: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  ProductSale: ProductSale[];
}

export interface ProductSale {
  id: number;
  quantity: number;
  price: number;
  productId: number;
  saleId: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}
