import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  CreateUserFormSchema,
  createUserFormSchema,
} from "../forms/create-user";
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
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useCreateUser } from "../useCreateUser";
import { queryClient } from "@/lib/react-query";

interface CreateUserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutateAsync: createUserMutate } = useCreateUser();

  const form = useForm<CreateUserFormSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(createUserFormSchema),
    reValidateMode: "onChange",
  });

  const handleCreateUserSubmit = async (values: CreateUserFormSchema) => {
    try {
      const response = await createUserMutate(values);
      toast.success(response.data.message);
      form.reset();
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["users"],
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
          <DialogTitle>New user</DialogTitle>
          <DialogDescription>
            Fill the field to create new product. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleCreateUserSubmit(values)
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
                      <Input placeholder="Enter user name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter user email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter user password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm user password"
                        {...field}
                      />
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
