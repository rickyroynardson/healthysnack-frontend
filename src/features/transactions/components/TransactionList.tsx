import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSales } from "@/features/sales";
import { Sale } from "@/features/sales/types";
import { TransactionListItem } from "./TransactionListItem";

export const TransactionList: React.FC = () => {
  const { data: sales } = useGetSales();

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales?.data.data.length ? (
            sales.data.data.map((sale: Sale) => (
              <TransactionListItem key={sale.id} {...sale} />
            ))
          ) : (
            <TableRow>
              <TableCell>No transaction data found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
