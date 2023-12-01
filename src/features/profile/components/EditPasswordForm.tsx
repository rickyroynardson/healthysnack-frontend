import { useForm } from "react-hook-form";
import {
  EditPasswordFormSchema,
  editPasswordFormSchema,
} from "../forms/edit-password";
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
import { useEditPassword } from "../useEditPassword";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const EditPasswordForm: React.FC = ({}) => {
  const { mutateAsync: editPasswordMutate, isPending: editPasswordIsPending } =
    useEditPassword();

  const form = useForm<EditPasswordFormSchema>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(editPasswordFormSchema),
    reValidateMode: "onChange",
  });

  const handleEditPasswordSubmit = async (values: EditPasswordFormSchema) => {
    try {
      const response = await editPasswordMutate(values);
      toast.success(response.data.message);
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          handleEditPasswordSubmit(values)
        )}
        className="space-y-4"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your new password"
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
                    placeholder="Confirm your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={editPasswordIsPending}>
          Update Password
        </Button>
      </form>
    </Form>
  );
};
