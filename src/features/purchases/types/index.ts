import { Inventory } from "@/features/inventories/types";

export interface Purchase {
  id: number;
  invoiceNumber: string;
  vendor: string;
  orderDate: Date;
  memo: string;
  total: number;
  InventoryPurchase: InventoryPurchase[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryPurchase {
  id: number;
  quantity: number;
  price: number;
  inventory: Inventory;
  createdAt: Date;
  updatedAt: Date;
}
