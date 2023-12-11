import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteInventory, useGetInventories } from "..";
import { Inventory } from "../types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InventoryListItem } from ".";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { AxiosError } from "axios";

export const InventoryList = () => {
  let ellipsisDisplayed = false;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const searchName = searchParams.get("name") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const limitPerPage = 10;

  const { data: inventories } = useGetInventories({
    page: currentPage,
    name: searchName,
  });
  const { mutateAsync: deleteInventoryMutate } = useDeleteInventory();

  const totalData = inventories?.data.meta.total || 0;
  const totalPages = Math.ceil(totalData / limitPerPage);

  const handleChangePage = (page: number) => {
    router.push({
      href: router.asPath,
      query: { ...router.query, page },
    });
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ("code" in e && e.code !== "Enter") return;

    router.push({
      href: router.asPath,
      query: { name: search, page: 1 },
    });
  };

  const handleDeleteInventory = async (id: number) => {
    try {
      const response = await deleteInventoryMutate(id);
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: ["inventories"],
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
      <div>
        <Input
          placeholder="Search inventory..."
          defaultValue={searchName}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead colSpan={2}>Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventories?.data.data.length ? (
              inventories.data.data.map((inventory: Inventory) => (
                <InventoryListItem
                  key={inventory.id}
                  onDelete={handleDeleteInventory}
                  {...inventory}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No inventory data found</TableCell>
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
