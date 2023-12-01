import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { Button } from "@/components/ui/button";
import { TransactionList } from "@/features/transactions/components";
import { NextPage } from "next";
import Link from "next/link";

const TransactionsPage: NextPage = () => {
  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Transaction" />
      <FullPageLayout>
        <div className="container space-y-4 py-4 pb-24 lg:pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">Transaction</p>
              <p className="text-foreground/60">Showing all transactions</p>
            </div>
            <Link href="/sales">
              <Button size="sm">New transaction</Button>
            </Link>
          </div>
          <TransactionList />
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default TransactionsPage;
