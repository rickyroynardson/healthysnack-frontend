import { NextPage } from "next";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { BestSellingProductList } from "@/features/products/components";
import { SalesProfitCard, SalesTotalCard } from "@/features/sales/components";

const DashboardPage: NextPage = () => {
  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Dashboard" />
      <FullPageLayout>
        <div className="container space-y-6 py-4 pb-24 lg:pb-4">
          <div className="space-y-4">
            <div>
              <p className="text-lg font-bold">Dashboard</p>
              <p className="text-foreground/60">
                Showing store performance & statistic
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <BestSellingProductList />
            <div className="space-y-4">
              <SalesTotalCard />
              <SalesProfitCard />
            </div>
          </div>
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default DashboardPage;
