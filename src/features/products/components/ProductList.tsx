import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProducts } from "..";
import { ProductListItem } from "./ProductListItem";
import { Product } from "../types";
import { useDeleteProduct } from "../useDeleteProduct";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { AxiosError } from "axios";

export const ProductList: React.FC = () => {
  const { data: products } = useGetProducts();
  const { mutateAsync: deleteProductMutate } = useDeleteProduct();

  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await deleteProductMutate(id);
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Capital</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead colSpan={2}>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.data.data.length ? (
            products.data.data.map((product: Product) => (
              <ProductListItem
                key={product.id}
                onDelete={handleDeleteProduct}
                {...product}
              />
            ))
          ) : (
            <TableRow>
              <TableCell>No product data found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
