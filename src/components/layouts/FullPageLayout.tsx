import { PropsWithChildren } from "react";
import { Header } from "../elements/Header";
import { Sidebar } from "../elements/Sidebar";

export const FullPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="grow">{children}</main>
      </div>
    </>
  );
};
