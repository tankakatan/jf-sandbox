import { Dialog } from "@ark-ui/react/dialog";
import { ark } from "@ark-ui/react/factory";
import { Portal } from "@ark-ui/react/portal";
import cx from "classnames";
import type { User } from "@/entities/user/types";

interface DeleteDialogProps {
  user: User;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteDialog({
  user,
  open,
  onConfirm,
  onCancel,
}: DeleteDialogProps) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => !details.open && onCancel()}
      lazyMount
      unmountOnExit
    >
      <Portal>
        <Dialog.Backdrop className={cx("fixed", "inset-0", "bg-black/50")} />
        <Dialog.Positioner
          className={cx(
            "fixed",
            "inset-0",
            "flex",
            "items-center",
            "justify-center",
          )}
        >
          <Dialog.Content
            className={cx(
              "bg-white",
              "rounded-xl",
              "shadow-lg",
              "p-6",
              "w-full",
              "max-w-sm",
            )}
          >
            <Dialog.Title className={cx("text-lg", "font-bold")}>
              Confirm Deletion
            </Dialog.Title>
            <Dialog.Description
              className={cx("text-sm", "text-gray-600", "mt-2")}
            >
              Are you sure you want to delete {user.firstName} {user.lastName}?
              This action cannot be undone.
            </Dialog.Description>
            <ark.div className={cx("flex", "justify-end", "gap-2", "mt-4")}>
              <Dialog.CloseTrigger asChild>
                <ark.button
                  type="button"
                  className={cx(
                    "px-4",
                    "py-2",
                    "rounded-md",
                    "text-sm",
                    "font-medium",
                    "text-gray-700",
                    "bg-gray-100",
                    "hover:bg-gray-200",
                  )}
                  onClick={onCancel}
                >
                  Cancel
                </ark.button>
              </Dialog.CloseTrigger>
              <Dialog.CloseTrigger asChild>
                <ark.button
                  type="button"
                  className={cx(
                    "px-4",
                    "py-2",
                    "rounded-md",
                    "text-sm",
                    "font-medium",
                    "text-white",
                    "bg-red-600",
                    "hover:bg-red-700",
                  )}
                  onClick={onConfirm}
                >
                  Confirm
                </ark.button>
              </Dialog.CloseTrigger>
            </ark.div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
