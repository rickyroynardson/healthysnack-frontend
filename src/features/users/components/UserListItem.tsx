import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash } from "lucide-react";

interface UserListItemProps {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  onDelete: (id: number) => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  id,
  name,
  email,
  onDelete,
}) => {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell className="text-right">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Trash className="w-4 aspect-square" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Data that has been deleted cannot be accessed again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(id)}>
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};
