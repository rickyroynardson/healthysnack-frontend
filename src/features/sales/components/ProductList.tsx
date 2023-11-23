import { useGetProducts } from "@/features/products";
import { ProductListItem } from ".";
import { Product } from "@/features/products/types";

interface ProductListProps {
  onProductClick: (productId: number, name: string, price: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  const { data: products } = useGetProducts();

  return (
    <div className="w-full h-fit grid grid-cols-3 gap-4 max-h-[40vh] lg:max-h-[95vh] overflow-y-auto">
      {products?.data.data.map((product: Product) => (
        <ProductListItem
          key={product.id}
          onProductClick={onProductClick}
          {...product}
        />
      ))}
    </div>
  );
};
