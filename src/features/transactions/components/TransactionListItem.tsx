import moment from "moment";
import { TableCell, TableRow } from "@/components/ui/table";
import { toRupiah } from "@/utils/format";

interface TransactionListItemProps {
  id: number;
  total: number;
  createdAt: Date;
}

export const TransactionListItem: React.FC<TransactionListItemProps> = ({
  id,
  total,
  createdAt,
}) => {
  return (
    <TableRow>
      <TableCell>{moment(createdAt).format("lll")}</TableCell>
      <TableCell>{toRupiah(total)}</TableCell>
    </TableRow>
  );
};
