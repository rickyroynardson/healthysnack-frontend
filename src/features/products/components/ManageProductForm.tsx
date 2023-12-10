import { useForm } from "react-hook-form";
import {
  ManageProductStockFormSchema,
  manageProductStockFormSchema,
} from "../forms/manage-product-stock";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProducts } from "..";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useManageProductStock } from "../useManageProductStock";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { AxiosError } from "axios";

export const ManageProductForm: React.FC = () => {
  const { data: products } = useGetProducts();
  const { mutateAsync: manageProductStockMutate } = useManageProductStock();

  const form = useForm<ManageProductStockFormSchema>({
    defaultValues: {
      id: "",
      quantity: "0",
    },
    resolver: zodResolver(manageProductStockFormSchema),
    reValidateMode: "onChange",
  });

  const handleManageProductStockSubmit = async (
    values: ManageProductStockFormSchema,
    action: "increase" | "decrease"
  ) => {
    try {
      const response = await manageProductStockMutate({ ...values, action });
      toast.success(response.data.message);
      form.reset();
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
    <Form {...form}>
      <div className="flex items-center gap-1">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="grow">
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {products?.data.data.data.map((product: Product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="grow">
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={form.handleSubmit((values) =>
              handleManageProductStockSubmit(values, "decrease")
            )}
          >
            <Minus className="w-4 aspect-square" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={form.handleSubmit((values) =>
              handleManageProductStockSubmit(values, "increase")
            )}
          >
            <Plus className="w-4 aspect-square" />
          </Button>
        </div>
      </div>
    </Form>
  );
};
