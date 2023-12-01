import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProductCategories } from "..";
import { ProductCategory } from "../types";
import { ProductCategoryListItem } from ".";
import { useDeleteProductCategory } from "../useDeleteProductCategory";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

export const ProductCategoryList: React.FC = () => {
  const { data: productCategories } = useGetProductCategories();
  const { mutateAsync: deleteProductCategoryMutate } =
    useDeleteProductCategory();

  const handleDeleteProductCategory = async (id: number) => {
    try {
      const response = await deleteProductCategoryMutate(id);
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: ["product-categories"],
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
            <TableHead colSpan={2}>Product Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productCategories?.data.data.length ? (
            productCategories.data.data.map(
              (productCategory: ProductCategory) => (
                <ProductCategoryListItem
                  key={productCategory.id}
                  onDelete={handleDeleteProductCategory}
                  {...productCategory}
                />
              )
            )
          ) : (
            <TableRow>
              <TableCell>No product categories found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
