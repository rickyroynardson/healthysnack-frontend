import { ManageInventoryForm } from ".";

export const ManageInventory: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold">Manage Inventory</p>
          <p className="text-foreground/60">Increase or manage inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <p>log</p>
        </div>
      </div>
      <ManageInventoryForm />
    </div>
  );
};
