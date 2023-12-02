import moment from "moment";
import { TableCell, TableRow } from "@/components/ui/table";
import { toRupiah } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { ProductSale } from "@/features/sales/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TransactionListItemProps {
  id: number;
  total: number;
  ProductSale: ProductSale[];
  createdAt: Date;
}

export const TransactionListItem: React.FC<TransactionListItemProps> = ({
  id,
  total,
  ProductSale,
  createdAt,
}) => {
  return (
    <TableRow>
      <TableCell>{moment(createdAt).format("lll")}</TableCell>
      <TableCell>{toRupiah(total)}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Info className="w-4 aspect-square" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Transaction Detail</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">
                  {moment(createdAt).format("LLL")}
                </p>
              </div>
              <div className="space-y-1">
                {ProductSale.map((product, index) => (
                  <div key={index}>
                    <p>{product.product.name}</p>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-muted-foreground">
                        {product.quantity} x {product.product.price}
                      </p>
                      <p>
                        {toRupiah(product.quantity * product.product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};
