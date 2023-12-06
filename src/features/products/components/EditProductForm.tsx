import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { X } from "lucide-react";

interface EditProductFormProps {
  id: number;
  name: string;
  price: string;
  stock: string;
  productCategoryId: string;
  materials: {
    materialId?: number;
    name: string;
    quantity: string;
    unit: string;
    price: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
}

export const EditProductForm: React.FC<EditProductFormProps> = ({
  id,
  name,
  price,
  stock,
  productCategoryId,
  materials,
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
      materials,
    },
    resolver: zodResolver(editProductFormSchema),
    reValidateMode: "onChange",
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "materials",
  });

  const handleAddMaterialInput = () => {
    fieldArray.append({
      materialId: undefined,
      name: "",
      quantity: "",
      unit: "",
      price: "",
    });
  };

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
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Materials</p>
              <div className="space-y-2">
                {fieldArray.fields.map(
                  (
                    value: {
                      id: string;
                      name: string;
                      quantity: string;
                      unit: string;
                      price: string;
                    },
                    index
                  ) => (
                    <div key={value.id} className="flex items-center gap-1">
                      <FormField
                        control={form.control}
                        name={`materials.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="grow">
                            <FormControl>
                              <Input placeholder="Name" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`materials.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="grow">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Quantity"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`materials.${index}.unit`}
                        render={({ field }) => (
                          <FormItem className="grow">
                            <FormControl>
                              <Input placeholder="Unit" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`materials.${index}.price`}
                        render={({ field }) => (
                          <FormItem className="grow">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Price"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => fieldArray.remove(index)}
                        className="grow shrink-0"
                      >
                        <X className="w-4 aspect-square" />
                      </Button>
                    </div>
                  )
                )}
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-full"
                onClick={handleAddMaterialInput}
              >
                Add material
              </Button>
            </div>
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
