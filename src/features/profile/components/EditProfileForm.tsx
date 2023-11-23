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
  EditProfileFormSchema,
  editProfileFormSchema,
} from "../forms/edit-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetProfile } from "..";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface EditProfileFormProps {
  isPending: boolean;
  onSubmit: (values: EditProfileFormSchema) => void;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  isPending,
  onSubmit,
}) => {
  const { data: profile } = useGetProfile();

  const form = useForm<EditProfileFormSchema>({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: zodResolver(editProfileFormSchema),
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (profile?.data) {
      form.setValue("name", profile.data.data.name);
      form.setValue("email", profile.data.data.email);
    }
  }, [form, profile]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => onSubmit(values))}>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Update Profile
        </Button>
      </form>
    </Form>
  );
};
