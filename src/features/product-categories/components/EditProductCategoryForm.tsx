import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  EditProductCategoryFormSchema,
  editProductCategoryFormSchema,
} from "../forms/edit-product-category";
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
import { useEditProductCategory } from "../useEditProductCategory";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

interface EditProductCategoryFormProps {
  id: number;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProductCategoryForm: React.FC<
  EditProductCategoryFormProps
> = ({ id, name, isOpen, onClose }) => {
  const {
    mutateAsync: editProductCategoryMutate,
    isPending: editProductCategoryIsPending,
  } = useEditProductCategory();

  const form = useForm<EditProductCategoryFormSchema>({
    defaultValues: {
      name,
    },
    resolver: zodResolver(editProductCategoryFormSchema),
    reValidateMode: "onChange",
  });

  const handleEditProductCategorySubmit = async (
    values: EditProductCategoryFormSchema
  ) => {
    try {
      const response = await editProductCategoryMutate({ id, ...values });
      toast.success(response.data.message);
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["product-categories"],
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
          <DialogTitle>Edit Product Category</DialogTitle>
          <DialogDescription>
            Change the value on field to update the data. Click update when
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleEditProductCategorySubmit(values)
            )}
            className="space-y-4"
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
