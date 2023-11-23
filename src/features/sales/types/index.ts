import { Product } from "@/features/products/types";

export interface Sale {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  ProductSale: {
    id: number;
    quantity: number;
    price: number;
    productId: number;
    saleId: number;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
  }[];
}
