import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  EditProductFormSchema,
  editProductFormSchema,
} from "../forms/edit-product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCategory } from "@/features/product-categories/types";
import { useGetProductCategories } from "@/features/product-categories";
import { useEditProduct } from "../useEditProduct";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

interface EditProductFormProps {
  id: number;
  name: string;
  price: string;
  stock: string;
  productCategoryId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProductForm: React.FC<EditProductFormProps> = ({
  id,
  name,
  price,
  stock,
  productCategoryId,
  isOpen,
  onClose,
}) => {
  const { data: productCategories } = useGetProductCategories();
  const { mutateAsync: editProductMutate } = useEditProduct();

  const form = useForm<EditProductFormProps>({
    defaultValues: {
      name,
      price,
      stock,
      productCategoryId,
    },
    resolver: zodResolver(editProductFormSchema),
    reValidateMode: "onChange",
  });

  const handleEditProductSubmit = async (values: EditProductFormSchema) => {
    try {
      const response = await editProductMutate({ id, ...values });
      toast.success(response.data.message);
      onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Change the value on field to update the data. Click update when
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleEditProductSubmit(values)
            )}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productCategories?.data.data.map(
                        (productCategory: ProductCategory) => (
                          <SelectItem
                            key={productCategory.id}
                            value={productCategory.id.toString()}
                          >
                            {productCategory.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Button type="submit" className="w-full sm:w-auto">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
