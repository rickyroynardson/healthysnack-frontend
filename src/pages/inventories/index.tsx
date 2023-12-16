import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { Button } from "@/components/ui/button";
import {
  CreateInventoryForm,
  InventoryList,
  ManageInventory,
} from "@/features/inventories/components";
import { NextPage } from "next";
import { useState } from "react";

const InventoriesPage: NextPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <AuthenticatedRoute>
      <HeadMetaData title="Inventory" />
      <FullPageLayout>
        <CreateInventoryForm
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
        />
        <div className="container space-y-4 py-4 pb-24 lg:pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">Inventory</p>
              <p className="text-foreground/60">Showing all inventories</p>
            </div>
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
              New inventory
            </Button>
          </div>
          <InventoryList />
          <ManageInventory />
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default InventoriesPage;
