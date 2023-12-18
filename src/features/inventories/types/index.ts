export interface Inventory {
  id: number;
  name: string;
  stock: number;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryLog {
  id: number;
  description: string;
  memo: string;
  type: "INCREASE" | "DECREASE" | "UPDATE" | "PURCHASE";
  createdAt: Date;
}
