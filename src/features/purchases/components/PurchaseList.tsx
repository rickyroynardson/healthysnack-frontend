import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/router";
import { useGetPurchases } from "../useGetPurchases";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Purchase } from "../types";
import { PurchaseListItem } from ".";

export const PurchaseList: React.FC = () => {
  let ellipsisDisplayed = false;
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limitPerPage = 10;

  const { data: purchases } = useGetPurchases({
    page: currentPage,
  });

  const totalData = purchases?.data.meta.total || 0;
  const totalPages = Math.ceil(totalData / limitPerPage);

  const handleChangePage = (page: number) => {
    router.push({
      href: router.asPath,
      query: { ...router.query, page },
    });
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
              <TableHead>Invoice Number</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead colSpan={2}>Memo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases?.data.data.length ? (
              purchases.data.data.map((purchase: Purchase) => (
                <PurchaseListItem key={purchase.id} {...purchase} />
              ))
            ) : (
              <TableRow>
                <TableCell>No purchase data found</TableCell>
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
