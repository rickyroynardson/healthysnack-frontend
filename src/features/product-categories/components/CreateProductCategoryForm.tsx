import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  CreateProductCategoryFormSchema,
  createProductCategoryFormSchema,
} from "../forms/create-product-category";
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
import { useCreateProductCategory } from "../useCreateProductCategory";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { queryClient } from "@/lib/react-query";

interface CreateProductCategoryFormProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const CreateProductCategoryForm: React.FC<
  CreateProductCategoryFormProps
> = ({ isOpen, handleClose }) => {
  const {
    mutateAsync: createProductCategoryMutate,
    isPending: createProductCategoryIsPending,
  } = useCreateProductCategory();

  const form = useForm<CreateProductCategoryFormSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createProductCategoryFormSchema),
    reValidateMode: "onChange",
  });

  const handleCreateProductCategorySubmit = async (
    values: CreateProductCategoryFormSchema
  ) => {
    try {
      const response = await createProductCategoryMutate(values);
      toast.success(response.data.message);
      form.reset();
      handleClose();
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
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        handleClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New product category</DialogTitle>
          <DialogDescription>
            Fill the field to create new product category. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleCreateProductCategorySubmit(values)
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
            <div className="flex items-center justify-end">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={createProductCategoryIsPending}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
