import { AuthenticatedRoute } from "@/components/guards/AuthenticatedRoute";
import { FullPageLayout } from "@/components/layouts/FullPageLayout";
import { HeadMetaData } from "@/components/meta/HeadMetaData";
import { Button } from "@/components/ui/button";
import { CreateUserForm, UserList } from "@/features/users/components";
import { NextPage } from "next";
import { useState } from "react";

const UsersPage: NextPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <AuthenticatedRoute>
      <HeadMetaData title="User" />
      <FullPageLayout>
        <CreateUserForm
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
        />
        <div className="container space-y-4 py-4 pb-24 lg:pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">User</p>
              <p className="text-foreground/60">Showing all users registered</p>
            </div>
            <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
              New user
            </Button>
          </div>
          <UserList />
        </div>
      </FullPageLayout>
    </AuthenticatedRoute>
  );
};

export default UsersPage;
