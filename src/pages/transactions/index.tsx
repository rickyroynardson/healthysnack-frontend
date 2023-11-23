import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { TransactionList } from "@/features/transactions/components";
import { NextPage } from "next";

const TransactionsPage: NextPage = () => {
  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Transaction" />
      <FullPageLayout>
        <div className="container py-4 pb-24 lg:pb-4">
          <div>
            <p className="text-lg font-bold">Transaction</p>
            <p className="text-foreground/60">Showing all transactions</p>
          </div>
          <TransactionList />
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default TransactionsPage;
