import { ark } from "@ark-ui/react/factory";
import cx from "classnames";
import { useUserList } from "../../atoms/users";
import UserList from "../UserList";

export default function App() {
  const users = useUserList();

  return (
    <ark.div className={cx("min-h-screen", "bg-gray-50", "p-8")}>
      <ark.div className={cx("max-w-2xl", "mx-auto")}>
        <UserList users={users} />
      </ark.div>
    </ark.div>
  );
}
