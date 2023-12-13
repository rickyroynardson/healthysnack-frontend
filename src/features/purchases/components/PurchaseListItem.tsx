import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { toRupiah } from "@/utils/format";
import { Info } from "lucide-react";
import moment from "moment";
import { InventoryPurchase } from "../types";

interface PurchaseListItemProps {
  id: number;
  invoiceNumber: string;
  vendor: string;
  orderDate: Date;
  memo: string;
  total: number;
  InventoryPurchase: InventoryPurchase[];
  createdAt: Date;
  updatedAt: Date;
}

export const PurchaseListItem: React.FC<PurchaseListItemProps> = ({
  id,
  invoiceNumber,
  vendor,
  orderDate,
  memo,
  total,
  InventoryPurchase,
  createdAt,
  updatedAt,
}) => {
  return (
    <TableRow>
      <TableCell>{invoiceNumber}</TableCell>
      <TableCell>{vendor}</TableCell>
      <TableCell>{moment(orderDate).format("LL")}</TableCell>
      <TableCell>{toRupiah(total)}</TableCell>
      <TableCell>{memo}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Info className="w-4 aspect-square" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Purchase Detail</DialogTitle>
            </DialogHeader>
            <div>
              <div className="space-y-1">
                {InventoryPurchase.map((inventoryPurchase, index) => (
                  <div key={index}>
                    <p>{inventoryPurchase.inventory.name}</p>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-muted-foreground">
                        {inventoryPurchase.quantity} x {inventoryPurchase.price}
                      </p>
                      <p>
                        {toRupiah(
                          inventoryPurchase.quantity * inventoryPurchase.price
                        )}
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
