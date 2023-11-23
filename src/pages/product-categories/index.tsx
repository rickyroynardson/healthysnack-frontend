import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { Button } from "@/components/ui/button";
import { CreateProductCategoryForm } from "@/features/product-categories/components";
import { ProductCategoryList } from "@/features/product-categories/components/ProductCategoryList";
import { NextPage } from "next";
import { useState } from "react";

const ProductCategoriesPage: NextPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Product Category" />
      <FullPageLayout>
        <CreateProductCategoryForm
          isOpen={isCreateDialogOpen}
          handleClose={() => setIsCreateDialogOpen(false)}
        />
        <div className="container py-4 pb-24 lg:pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">Product Categories</p>
              <p className="text-foreground/60">
                Showing all product categories
              </p>
            </div>
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
              New category
            </Button>
          </div>
          <ProductCategoryList />
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default ProductCategoriesPage;
