import { BestSellingProductListItem } from ".";
import { BestSellingProduct } from "../types";
import { useGetBestSellingProducts } from "../useGetBestSellingProducts";

export const BestSellingProductList: React.FC = () => {
  const { data: bestSellingProducts } = useGetBestSellingProducts();

  return (
    <div className="border rounded-lg p-4 space-y-4 h-fit">
      <p className="text-center text-lg font-semibold">Best selling product</p>
      <div className="space-y-5 pb-4">
        {bestSellingProducts?.data.data.length ? (
          bestSellingProducts?.data.data.map(
            (bestSellingProduct: BestSellingProduct, index: number) => (
              <BestSellingProductListItem
                key={bestSellingProduct.id}
                number={index + 1}
                name={bestSellingProduct.name}
                totalQuantitySold={bestSellingProduct.totalQuantitySold}
              />
            )
          )
        ) : (
          <div className="text-center text-gray-400">No product sold.</div>
        )}
      </div>
    </div>
  );
};
