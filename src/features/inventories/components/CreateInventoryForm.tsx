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
import { useForm } from "react-hook-form";
import {
  CreateInventoryFormSchema,
  createInventoryFormSchema,
} from "../forms/create-inventory";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateInventory } from "..";
import { queryClient } from "@/lib/react-query";

interface CreateInventoryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateInventoryForm: React.FC<CreateInventoryFormProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutateAsync: createInventoryMutate } = useCreateInventory();

  const form = useForm<CreateInventoryFormSchema>({
    defaultValues: {
      name: "",
      unit: "",
    },
    resolver: zodResolver(createInventoryFormSchema),
    reValidateMode: "onChange",
  });

  const handleCreateInventorySubmit = async (
    values: CreateInventoryFormSchema
  ) => {
    try {
      const response = await createInventoryMutate(values);
      toast.success(response.data.message);
      form.reset();
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["inventories"],
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
          <DialogTitle>New inventory</DialogTitle>
          <DialogDescription>
            Fill the field to create new product. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleCreateInventorySubmit(values)
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
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
