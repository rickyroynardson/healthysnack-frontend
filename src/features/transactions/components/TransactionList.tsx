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
            <TableHead>Invoice Number</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total Item</TableHead>
            <TableHead className="hidden print:table-cell">Item List</TableHead>
            <TableHead colSpan={2}>Total Price</TableHead>
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
