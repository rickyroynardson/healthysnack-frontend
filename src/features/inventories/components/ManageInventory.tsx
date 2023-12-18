import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ManageInventoryForm } from ".";
import { useGetInventoryLogs } from "..";
import { Button } from "@/components/ui/button";
import { InventoryLog } from "../types";
import moment from "moment";
import { Badge } from "@/components/ui/badge";

export const ManageInventory: React.FC = () => {
  const { data: inventoryLogs } = useGetInventoryLogs();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold">Manage Inventory</p>
          <p className="text-foreground/60">Increase or manage inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm">
                Inventory Log
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Inventory Log</DialogTitle>
                <DialogDescription>
                  Showing inventory stock changes, sorted by latest.
                </DialogDescription>
              </DialogHeader>
              <div>
                {inventoryLogs?.data.data.map((inventoryLog: InventoryLog) => (
                  <div key={inventoryLog.id} className="py-1 border-b">
                    <div className="flex items-center justify-between">
                      <div className="grow">
                        <p className="text-sm text-gray-800">
                          {inventoryLog.description}
                        </p>
                        {inventoryLog.memo && (
                          <p className="text-xs text-gray-800">
                            Memo: {inventoryLog.memo}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {moment(inventoryLog.createdAt).format("lll")}
                        </p>
                      </div>
                      <Badge variant="outline">{inventoryLog.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ManageInventoryForm />
    </div>
  );
};
