import { useUserList } from "@/entities/user/model/selectors";
import UserList from "@/widgets/user-list";

export default function Page() {
  const users = useUserList();
  return <UserList users={users} />;
}
