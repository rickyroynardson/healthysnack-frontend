import moment from "moment";
import { TableCell, TableRow } from "@/components/ui/table";

interface TransactionListItemProps {
  id: number;
  createdAt: Date;
}

export const TransactionListItem: React.FC<TransactionListItemProps> = ({
  id,
  createdAt,
}) => {
  return (
    <TableRow>
      <TableCell>{moment(createdAt).format("lll")}</TableCell>
    </TableRow>
  );
};
