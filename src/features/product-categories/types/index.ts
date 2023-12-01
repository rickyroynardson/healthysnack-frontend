export interface ProductCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    Product: number;
  };
}
