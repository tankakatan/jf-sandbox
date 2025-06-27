import type { UserType } from '../UserList'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function User({ user }: { user: UserType }) {
  const handleEdit = () => { };
  const handleDelete = () => { };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between gap-4">
      <div>
        <div className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</div>
        <div className="text-sm text-gray-500">Region: {user.region}</div>
        <div className="text-xs mt-1">
          <span className={user.isActive ? 'text-green-600' : 'text-red-500'}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          aria-label="Edit"
          className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition"
          onClick={handleEdit}
        >
          <PencilSquareIcon className="w-5 h-5" />
        </button>
        <button
          aria-label="Delete"
          className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
          onClick={handleDelete}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
