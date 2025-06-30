import { Dialog, Portal } from "@ark-ui/react";
import { ark } from "@ark-ui/react/factory";
import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDeleteUser, useUserById } from "../../atoms/users";
import UserForm from "../UserForm";

export default function User({ id }: { id: number }) {
  const user = useUserById(id);
  const deleteUser = useDeleteUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setDialogIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  const onEdit = () => setIsEditing(true);
  const onEditDone = () => setIsEditing(false);
  const onDelete = () => deleteUser(id);

  if (isEditing) {
    return <UserForm user={user} onSave={onEditDone} onCancel={onEditDone} />;
  }

  return (
    <ark.div className="bg-white rounded-xl shadow p-6 flex items-center justify-between gap-4">
      <ark.div>
        <ark.div className="text-lg font-semibold text-gray-800">
          {user.firstName} {user.lastName}
        </ark.div>
        <ark.div className="text-sm text-gray-500">
          Region: {user.region}
        </ark.div>
        <ark.div className="text-xs mt-1">
          <ark.span
            className={user.isActive ? "text-green-600" : "text-red-500"}
          >
            {user.isActive ? "Active" : "Inactive"}
          </ark.span>
        </ark.div>
      </ark.div>
      <ark.div className="flex gap-2">
        <ark.button
          type="button"
          aria-label="Edit"
          className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition"
          onClick={onEdit}
        >
          <PencilSquareIcon className="w-5 h-5" />
        </ark.button>
        <Dialog.Root
          open={isDeleteDialogOpen}
          onOpenChange={(details) => setDialogIsOpen(details.open)}
          lazyMount
          unmountOnExit
        >
          <Dialog.Trigger asChild>
            <ark.button
              type="button"
              aria-label="Delete"
              className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
            >
              <TrashIcon className="w-5 h-5" />
            </ark.button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop className="fixed inset-0 bg-black/50" />
            <Dialog.Positioner className="fixed inset-0 flex items-center justify-center">
              <Dialog.Content className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                <Dialog.Title className="text-lg font-bold">
                  Confirm Deletion
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-600 mt-2">
                  Are you sure you want to delete {user.firstName}{" "}
                  {user.lastName}? This action cannot be undone.
                </Dialog.Description>
                <ark.div className="flex justify-end gap-2 mt-4">
                  <Dialog.CloseTrigger asChild>
                    <ark.button
                      type="button"
                      className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                      Cancel
                    </ark.button>
                  </Dialog.CloseTrigger>
                  <Dialog.CloseTrigger asChild>
                    <ark.button
                      type="button"
                      className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                      onClick={onDelete}
                    >
                      Confirm
                    </ark.button>
                  </Dialog.CloseTrigger>
                </ark.div>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </ark.div>
    </ark.div>
  );
}
