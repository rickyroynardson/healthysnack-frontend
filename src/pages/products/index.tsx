import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { Button } from "@/components/ui/button";
import { CreateProductForm, ProductList } from "@/features/products/components";
import { NextPage } from "next";
import { useState } from "react";

const ProductsPage: NextPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Product" />
      <FullPageLayout>
        <CreateProductForm
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
        />
        <div className="container py-4 pb-24 lg:pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">Product</p>
              <p className="text-foreground/60">Showing all products</p>
            </div>
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
              New product
            </Button>
          </div>
          <ProductList />
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default ProductsPage;
