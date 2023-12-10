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
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ProductList: React.FC = () => {
  let ellipsisDisplayed = false;
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limitPerPage = 10;

  const { data: products } = useGetProducts({ page: currentPage });
  const { mutateAsync: deleteProductMutate } = useDeleteProduct();

  const totalData = products?.data.data.meta.total || 0;
  const totalPages = Math.ceil(totalData / limitPerPage);

  const handleChangePage = (page: number) => {
    router.push({
      href: router.asPath,
      query: { page },
    });
  };

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

  const shouldDisplayPage = (index: number) => {
    return (
      index < 3 ||
      index > totalPages - 4 ||
      (index > currentPage - 4 && index < currentPage + 2)
    );
  };

  const renderPageOrEllipsis = (index: number) => {
    if (shouldDisplayPage(index)) {
      return (
        <Button
          key={index}
          variant={index + 1 === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => handleChangePage(index + 1)}
          disabled={index + 1 === currentPage}
        >
          {index + 1}
        </Button>
      );
    } else if (
      index === 3 ||
      index === totalPages - 4 ||
      index === currentPage - 4 ||
      index === currentPage + 2
    ) {
      if (!ellipsisDisplayed) {
        ellipsisDisplayed = true;
        return (
          <Button key={index} variant="outline" size="icon" disabled>
            ...
          </Button>
        );
      }
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Capital</TableHead>
              <TableHead>Materials</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead colSpan={2}>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.data.data.data.length ? (
              products.data.data.data.map((product: Product) => (
                <ProductListItem
                  key={product.id}
                  onDelete={handleDeleteProduct}
                  {...product}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No product data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 aspect-square" />
        </Button>
        {new Array(totalPages)
          .fill(1)
          .map((_, index) => renderPageOrEllipsis(index))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 aspect-square" />
        </Button>
      </div>
    </div>
  );
};
