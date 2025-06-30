import { ark } from "@ark-ui/react/factory";
import cx from "classnames";
import type { User as UserType } from "../../@types";
import User from "../User";

export default function UserList({ users }: { users: UserType[] }) {
  return (
    <ark.div className={cx("flex", "flex-col", "gap-4")}>
      {users.map((user) => (
        <User key={user.id} id={user.id} />
      ))}
    </ark.div>
  );
}
