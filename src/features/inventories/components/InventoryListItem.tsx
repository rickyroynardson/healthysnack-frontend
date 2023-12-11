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
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { EditInventoryForm } from ".";

interface InventoryListItemProps {
  id: number;
  name: string;
  stock: number;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
  onDelete: (id: number) => void;
}

export const InventoryListItem: React.FC<InventoryListItemProps> = ({
  id,
  name,
  stock,
  unit,
  createdAt,
  updatedAt,
  onDelete,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{stock}</TableCell>
      <TableCell>{unit}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Pencil className="w-4 aspect-square" />
        </Button>
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
      <TableCell hidden>
        <EditInventoryForm
          id={id}
          name={name}
          stock={stock.toString()}
          unit={unit}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />
      </TableCell>
    </TableRow>
  );
};
