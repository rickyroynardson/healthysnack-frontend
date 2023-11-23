import { ProductCategory } from "@/features/product-categories/types";
import { toRupiah } from "@/utils/format";

interface ProductListItemProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  productCategoryId: number;
  productCategory: ProductCategory;
  createdAt: Date;
  updatedAt: Date;
  onProductClick: (productId: number, name: string, price: number) => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  id,
  name,
  price,
  stock,
  productCategoryId,
  productCategory,
  createdAt,
  updatedAt,
  onProductClick,
}) => {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer ${
        stock <= 0 && "bg-gray-200"
      }`}
      onClick={() => stock > 0 && onProductClick(id, name, price)}
    >
      <p className="text-xs">{productCategory.name}</p>
      <p className="font-semibold">{name}</p>
      <p className="text-sm">{toRupiah(price)}</p>
      <p className="text-xs">Stock: {stock}</p>
    </div>
  );
};
