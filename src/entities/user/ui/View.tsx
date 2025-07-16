import { ark } from "@ark-ui/react/factory";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { useState } from "react";
import { useDeleteUser } from "@/entities/user/model/actions";
import { useUserById } from "@/entities/user/model/selectors";
import DeleteDialog from "@/features/user/delete";
import UpdateUserForm from "@/features/user/update";

export default function UserView({ id }: { id: number }) {
  const user = useUserById(id);
  const deleteUser = useDeleteUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setDialogIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  const onEdit = () => setIsEditing(true);
  const onEditDone = () => setIsEditing(false);
  const onDelete = () => {
    deleteUser(id);
    setDialogIsOpen(false);
  };

  if (isEditing) {
    return (
      <UpdateUserForm userId={id} onSave={onEditDone} onCancel={onEditDone} />
    );
  }

  return (
    <ark.div
      className={cx(
        "bg-white",
        "rounded-xl",
        "shadow",
        "p-6",
        "flex",
        "items-center",
        "justify-between",
        "gap-4",
      )}
    >
      <ark.div>
        <ark.div className={cx("text-lg", "font-semibold", "text-gray-800")}>
          {user.firstName} {user.lastName}
        </ark.div>
        <ark.div className={cx("text-sm", "text-gray-500")}>
          Region: {user.region}
        </ark.div>
        <ark.div className={cx("text-xs", "mt-1")}>
          {" "}
          <ark.span
            className={cx(user.isActive ? "text-green-600" : "text-red-500")}
          >
            {user.isActive ? "Active" : "Inactive"}
          </ark.span>{" "}
        </ark.div>
      </ark.div>
      <ark.div className={cx("flex", "gap-2")}>
        <ark.button
          type="button"
          aria-label="Edit"
          className={cx(
            "p-2",
            "rounded-full",
            "hover:bg-blue-100",
            "text-blue-600",
            "transition",
          )}
          onClick={onEdit}
        >
          <PencilSquareIcon className={cx("w-5", "h-5")} />
        </ark.button>
        <ark.button
          type="button"
          aria-label="Delete"
          className={cx(
            "p-2",
            "rounded-full",
            "hover:bg-red-100",
            "text-red-600",
            "transition",
          )}
          onClick={() => setDialogIsOpen(true)}
        >
          <TrashIcon className={cx("w-5", "h-5")} />
        </ark.button>
        <DeleteDialog
          user={user}
          open={isDeleteDialogOpen}
          onConfirm={onDelete}
          onCancel={() => setDialogIsOpen(false)}
        />
      </ark.div>
    </ark.div>
  );
}
