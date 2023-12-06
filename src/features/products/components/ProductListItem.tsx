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
import { ProductCategory } from "@/features/product-categories/types";
import { toRupiah } from "@/utils/format";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { EditProductForm } from "./EditProductForm";
import { ProductMaterial } from "../types";

interface ProductListItemProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  productCategoryId: number;
  productCategory: ProductCategory;
  ProductMaterial: ProductMaterial[];
  capital: number;
  createdAt: Date;
  updatedAt: Date;
  onDelete: (id: number) => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  id,
  name,
  price,
  stock,
  productCategoryId,
  productCategory,
  ProductMaterial,
  capital,
  createdAt,
  updatedAt,
  onDelete,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{toRupiah(price)}</TableCell>
      <TableCell>{toRupiah(capital)}</TableCell>
      <TableCell>{stock}</TableCell>
      <TableCell>{productCategory.name}</TableCell>
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
        <EditProductForm
          id={id}
          name={name}
          price={price.toString()}
          stock={stock.toString()}
          productCategoryId={productCategoryId.toString()}
          materials={
            ProductMaterial
              ? ProductMaterial.map((material) => ({
                  ...material,
                  materialId: material.id,
                  price: material.price.toString(),
                  quantity: material.quantity.toString(),
                }))
              : []
          }
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />
      </TableCell>
    </TableRow>
  );
};
