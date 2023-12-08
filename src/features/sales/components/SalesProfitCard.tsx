import { CircleDollarSign } from "lucide-react";
import { useGetSalesProfit } from "..";
import { toRupiah } from "@/utils/format";

export const SalesProfitCard: React.FC = () => {
  const { data: salesProfit } = useGetSalesProfit();

  return (
    <div className="border rounded-lg p-4 space-y-4 h-fit">
      <p className="text-center text-lg font-semibold">Sales profit</p>
      {salesProfit?.data.data ? (
        <div className="space-y-2">
          <div>
            <p className="text-muted-foreground">Today</p>
            <div className="flex items-center gap-2">
              <CircleDollarSign size={28} className="text-green-400" />
              <p className="text-2xl">
                {toRupiah(salesProfit.data.data.todayProfit)}
              </p>
              {salesProfit.data.data.percentageChange && (
                <p
                  className={`${
                    salesProfit.data.data.percentageChange > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {salesProfit.data.data.percentageChange > 0 && "+"}
                  {salesProfit.data.data.percentageChange}%
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Yesterday</p>
            <div className="flex items-center gap-2">
              <CircleDollarSign size={20} className="text-green-400" />
              <p>{toRupiah(salesProfit.data.data.yesterdayProfit)}</p>
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
