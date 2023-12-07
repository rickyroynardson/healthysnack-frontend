import { toRupiah } from "@/utils/format";
import { CircleDollarSign } from "lucide-react";
import { useGetSalesTotal } from "..";

export const SalesTotalCard: React.FC = () => {
  const { data: salesTotal } = useGetSalesTotal();

  return (
    <div className="border rounded-lg p-4 space-y-4 h-fit">
      <p className="text-center text-lg font-semibold">Sales total</p>
      {salesTotal?.data.data ? (
        <div className="space-y-2">
          <div>
            <p className="text-muted-foreground">Today</p>
            <div className="flex items-center gap-2">
              <CircleDollarSign size={28} />
              <p className="text-2xl">{toRupiah(salesTotal.data.data.total)}</p>
              <p
                className={`${
                  salesTotal.data.data.percentageChange > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {salesTotal.data.data.percentageChange > 0 && "+"}
                {salesTotal.data.data.percentageChange}%
              </p>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Yesterday</p>
            <div className="flex items-center gap-2">
              <CircleDollarSign size={20} />
              <p>{toRupiah(salesTotal.data.data.yesterdayTotal)}</p>
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
