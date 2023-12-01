import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  CreateProductFormSchema,
  createProductFormSchema,
} from "../forms/create-product";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useGetProductCategories } from "@/features/product-categories";
import { ProductCategory } from "@/features/product-categories/types";
import { useCreateProduct } from "../useCreateProduct";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

interface CreateProductFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProductForm: React.FC<CreateProductFormProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: productCategories } = useGetProductCategories();
  const { mutateAsync: createProductMutate } = useCreateProduct();

  const form = useForm<CreateProductFormSchema>({
    defaultValues: {
      name: "",
      price: "0",
      productCategoryId: "",
    },
    resolver: zodResolver(createProductFormSchema),
    reValidateMode: "onChange",
  });

  const handleCreateProductSubmit = async (values: CreateProductFormSchema) => {
    try {
      const response = await createProductMutate(values);
      toast.success(response.data.message);
      form.reset();
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
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New product</DialogTitle>
          <DialogDescription>
            Fill the field to create new product. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleCreateProductSubmit(values)
            )}
            className="space-y-4"
          >
            <div className="space-y-2">
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
            </div>
            <div className="flex items-center justify-end">
              <Button type="submit" className="w-full sm:w-auto">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
