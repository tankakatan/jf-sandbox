import { useUserList } from "../../atoms/users";
import UserList from "../UserList";

export default function App() {
  const users = useUserList();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <UserList users={users} />
      </div>
    </div>
  );
}
