import { useForm } from "react-hook-form";
import {
  ManageInventoryStockFormSchema,
  manageInventoryStockFormSchema,
} from "../forms/manage-inventory-stock";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllInventories } from "..";
import { Inventory } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export const ManageInventoryForm: React.FC = () => {
  const { data: inventories } = useGetAllInventories();

  const form = useForm<ManageInventoryStockFormSchema>({
    defaultValues: {
      id: "",
      quantity: "0",
      memo: "",
    },
    resolver: zodResolver(manageInventoryStockFormSchema),
    reValidateMode: "onChange",
  });

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
                    <SelectValue placeholder="Select inventory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {inventories?.data.data.map((inventory: Inventory) => (
                    <SelectItem
                      key={inventory.id}
                      value={inventory.id.toString()}
                    >
                      {inventory.name}
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
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem className="grow">
              <FormControl>
                <Input placeholder="Memo" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-1">
          <Button type="button" variant="outline" size="icon">
            <Minus className="w-4 aspect-square" />
          </Button>
          <Button type="button" variant="outline" size="icon">
            <Plus className="w-4 aspect-square" />
          </Button>
        </div>
      </div>
    </Form>
  );
};
