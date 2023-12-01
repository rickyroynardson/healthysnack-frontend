import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUsers } from "..";
import { User } from "../types";
import { UserListItem } from ".";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useDeleteUser } from "../useDeleteUser";
import { queryClient } from "@/lib/react-query";

export const UserList: React.FC = () => {
  const { data: users } = useGetUsers();
  const { mutateAsync: deleteUserMutate } = useDeleteUser();

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await deleteUserMutate(id);
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead colSpan={2}>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data.data.length ? (
            users.data.data.map((user: User) => (
              <UserListItem
                key={user.id}
                onDelete={handleDeleteUser}
                {...user}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>No user data found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
