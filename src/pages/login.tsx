import { NextPage } from "next";
import { GuestRoute } from "@/components/guards/GuestRouter";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { LoginForm } from "@/features/auth/components";
import { LoginFormSchema } from "@/features/auth/forms/login";
import { useLogin } from "@/features/auth";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useStore } from "@/store";

const LoginPage: NextPage = () => {
  const { onAuthSuccess } = useStore();
  const { mutateAsync: loginMutate, isPending: loginIsPending } = useLogin();

  const handleLoginSubmit = async (values: LoginFormSchema) => {
    try {
      const response = await loginMutate(values);
      toast.success(response.data.message);
      onAuthSuccess(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
    }
  };

  return (
    <GuestRoute>
      <HeadMetaData title="Login" />
      <main>
        <LoginForm isPending={loginIsPending} onSubmit={handleLoginSubmit} />
      </main>
    </GuestRoute>
  );
};

export default LoginPage;
