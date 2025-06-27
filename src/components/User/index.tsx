import { ark } from "@ark-ui/react/factory";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { UserType } from "../UserList";

export default function User({ user }: { user: UserType }) {
  const handleEdit = () => {};
  const handleDelete = () => {};

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
          onClick={handleEdit}
        >
          <PencilSquareIcon className="w-5 h-5" />
        </ark.button>
        <ark.button
          type="button"
          aria-label="Delete"
          className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
          onClick={handleDelete}
        >
          <TrashIcon className="w-5 h-5" />
        </ark.button>
      </ark.div>
    </ark.div>
  );
}
