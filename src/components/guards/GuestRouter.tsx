import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "@/store";

export const GuestRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  return children;
};
