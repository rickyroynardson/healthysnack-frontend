import { toRupiah } from "@/utils/format";
import { useGetTransactionProfit } from "..";
import { CircleDollarSign } from "lucide-react";

export const TransactionProfitCard: React.FC = () => {
  const { data: transactionProfit } = useGetTransactionProfit();

  return (
    <div className="border rounded-lg p-4 space-y-4 h-fit">
      <p className="text-center text-lg font-semibold">Sales profit</p>
      {transactionProfit?.data.data ? (
        <div>
          <div>
            <p className="text-muted-foreground">Today</p>
            <div className="flex items-center gap-2">
              <CircleDollarSign size={28} />
              <p className="text-2xl">
                {toRupiah(transactionProfit.data.data.total)}
              </p>
              <p
                className={`${
                  transactionProfit.data.data.percentageChange > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transactionProfit.data.data.percentageChange}%
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>No sales found.</p>
        </div>
      )}
    </div>
  );
};
