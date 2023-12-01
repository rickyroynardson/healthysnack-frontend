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
import { EditProductCategoryForm } from ".";
import { useState } from "react";

interface ProductCategoryListItemProps {
  id: number;
  name: string;
  _count: {
    Product: number;
  };
  onDelete: (id: number) => void;
}

export const ProductCategoryListItem: React.FC<
  ProductCategoryListItemProps
> = ({ id, name, _count, onDelete }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{_count.Product}</TableCell>
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
                All product with this category will be deleted. Data that has
                been deleted cannot be accessed again.
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
        <EditProductCategoryForm
          id={id}
          name={name}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />
      </TableCell>
    </TableRow>
  );
};
