import { useGetProducts } from "@/features/products";
import { ProductListItem } from ".";
import { Product } from "@/features/products/types";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ProductListProps {
  onProductClick: (productId: number, name: string, price: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  const [searchProduct, setSearchProduct] = useState("");

  const { data: products } = useGetProducts();

  return (
    <div className="w-full h-fit max-h-[40vh] lg:max-h-[95vh] overflow-y-auto space-y-3 lg:space-y-4">
      <div className="sticky top-0 p-1 bg-white">
        <Input
          type="search"
          placeholder="Search product..."
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products?.data.data
          .filter((product: Product) =>
            product.name.toLowerCase().includes(searchProduct.toLowerCase())
          )
          .map((product: Product) => (
            <ProductListItem
              key={product.id}
              onProductClick={onProductClick}
              {...product}
            />
          ))}
      </div>
    </div>
  );
};
