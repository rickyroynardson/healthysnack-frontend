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
import { useResetProductsStock } from "..";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { ManageProductForm } from ".";

export const ManageProduct: React.FC = () => {
  const { mutateAsync: resetProductsStockMutate } = useResetProductsStock();

  const handleResetProductsStock = async () => {
    try {
      const response = await resetProductsStockMutate();
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold">Manage Product</p>
          <p className="text-foreground/60">Increase or manage stock</p>
        </div>
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
      <ManageProductForm />
    </div>
  );
};
