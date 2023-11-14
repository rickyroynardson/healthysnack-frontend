import { NextPage } from "next";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";

const DashboardPage: NextPage = () => {
  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Dashboard" />
      <main>
        <h1>Hello world!</h1>
      </main>
    </AuthenticatedRoute>
  );
};

export default DashboardPage;
