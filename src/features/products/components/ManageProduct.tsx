import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useGetProductLogs, useResetProductsStock } from "..";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { ManageProductForm } from ".";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductLog } from "../types";
import moment from "moment";

export const ManageProduct: React.FC = () => {
  const { data: productLogs } = useGetProductLogs();
  const { mutateAsync: resetProductsStockMutate } = useResetProductsStock();

  const handleResetProductsStock = async () => {
    try {
      const response = await resetProductsStockMutate();
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["product-logs"],
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold">Manage Product</p>
          <p className="text-foreground/60">Increase or manage stock</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm">
                Product Log
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Product Log</DialogTitle>
                <DialogDescription>
                  Showing product stock changes, sorted by latest.
                </DialogDescription>
              </DialogHeader>
              <div>
                {productLogs?.data.data.map((productLog: ProductLog) => (
                  <div key={productLog.id} className="py-1 border-b">
                    <p className="text-sm text-gray-800">
                      {productLog.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {moment(productLog.createdAt).format("lll")}
                    </p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Reset stock
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  By resetting the stock, all products stock will be reset to 0.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetProductsStock}>
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <ManageProductForm />
    </div>
  );
};
