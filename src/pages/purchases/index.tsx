import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import Link from "next/link";

const PurchasesPage: NextPage = () => {
  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Purchase" />
      <FullPageLayout>
        <div className="container space-y-4 py-4 pb-24 lg:pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">Purchase</p>
              <p className="text-foreground/60">Showing all purchases</p>
            </div>
            <Link href="/purchases/new">
              <Button size="sm">New purchase</Button>
            </Link>
          </div>
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default PurchasesPage;
