import { NextPage } from "next";
import { GuestRoute } from "@/components/guards/GuestRouter";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { LoginForm } from "@/features/auth/components";

const LoginPage: NextPage = () => {
  return (
    <GuestRoute>
      <HeadMetaData title="Login" />
      <main>
        <h1>Login</h1>
        <LoginForm />
      </main>
    </GuestRoute>
  );
};

export default LoginPage;
