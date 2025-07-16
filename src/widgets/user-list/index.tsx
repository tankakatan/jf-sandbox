import { ark } from "@ark-ui/react/factory";
import { PlusIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { useState } from "react";
import type { User } from "@/entities/user/types";
import UserView from "@/entities/user/ui/View";
import CreateUserForm from "@/features/user/create";

export default function UserList({ users }: { users: User[] }) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <ark.div className={cx("flex", "flex-col", "gap-4", "relative")}>
      <ark.div className={cx("flex", "items-center", "mb-2")}>
        <ark.div className={cx("flex-1", "text-lg", "font-semibold")}>
          Users
        </ark.div>
        <ark.button
          type="button"
          aria-label="Create user"
          className={cx(
            "p-2",
            "rounded-full",
            "hover:bg-green-100",
            "text-green-600",
            "transition",
            "ml-2",
            "flex",
            "items-center",
            "justify-center",
          )}
          onClick={() => setIsCreating(true)}
        >
          <PlusIcon className={cx("w-5", "h-5")} />
        </ark.button>
      </ark.div>
      {isCreating && (
        <CreateUserForm
          onSave={() => setIsCreating(false)}
          onCancel={() => setIsCreating(false)}
        />
      )}
      {users.map((user) => (
        <UserView key={user.id} id={user.id} />
      ))}
    </ark.div>
  );
}
