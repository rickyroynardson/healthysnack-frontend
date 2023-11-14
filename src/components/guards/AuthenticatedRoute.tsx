import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "@/store";

export const AuthenticatedRoute: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  return children;
};
