import { useForm } from "react-hook-form";
import { useEditInventory } from "..";
import {
  EditInventoryFormSchema,
  editInventoryFormSchema,
} from "../forms/edit-inventory";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { queryClient } from "@/lib/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface EditInventoryFormProps {
  id: number;
  name: string;
  stock: string;
  unit: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EditInventoryForm: React.FC<EditInventoryFormProps> = ({
  id,
  name,
  stock,
  unit,
  isOpen,
  onClose,
}) => {
  const { mutateAsync: editInventoryMutate } = useEditInventory();

  const form = useForm<EditInventoryFormSchema>({
    defaultValues: {
      name,
      stock,
      unit,
    },
    resolver: zodResolver(editInventoryFormSchema),
    reValidateMode: "onChange",
  });

  const handleEditInventorySubmit = async (values: EditInventoryFormSchema) => {
    try {
      const response = await editInventoryMutate({ id, ...values });
      toast.success(response.data.message);
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["inventories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["inventory-logs"],
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
          <DialogTitle>Edit Inventory</DialogTitle>
          <DialogDescription>
            Change the value on field to update the data. Click update when
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleEditInventorySubmit(values)
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
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
