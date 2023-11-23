import { NextPage } from "next";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { Header } from "@/components/elements/Header";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";

const DashboardPage: NextPage = () => {
  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Dashboard" />
      <FullPageLayout>
        <h1>Hello world!</h1>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default DashboardPage;
