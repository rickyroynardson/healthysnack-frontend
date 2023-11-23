import { PropsWithChildren, useEffect, useState } from "react";

export const HydrationZustand: React.FC<PropsWithChildren> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? children : null;
};
