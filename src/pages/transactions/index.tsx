import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { Button } from "@/components/ui/button";
import { TransactionList } from "@/features/transactions/components";
import { Printer } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";

const TransactionsPage: NextPage = () => {
  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Transaction" />
      <FullPageLayout>
        <div className="container space-y-4 py-4 pb-24 lg:pb-4 print:p-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">Transaction</p>
              <p className="text-foreground/60">Showing all transactions</p>
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <Button
                variant="secondary"
                size="sm"
                className="hidden lg:flex space-x-1"
                onClick={() => window.print()}
              >
                <Printer className="w-4 aspect-square" />
                <span>Print</span>
              </Button>
              <Link href="/sales">
                <Button size="sm">New transaction</Button>
              </Link>
            </div>
          </div>
          <TransactionList />
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default TransactionsPage;
