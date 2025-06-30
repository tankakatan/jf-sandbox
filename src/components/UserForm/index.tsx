import { Field } from "@ark-ui/react";
import { ark } from "@ark-ui/react/factory";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { User as UserType } from "../../@types";
import { useUpdateUser } from "../../atoms/users";

interface UserFormProps {
  user: UserType;
  onSave: () => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSave, onCancel }: UserFormProps) {
  const [editedUser, setEditedUser] = useState<UserType>(user);
  const updateUser = useUpdateUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    updateUser(editedUser);
    onSave();
  };

  return (
    <ark.form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="bg-white rounded-xl shadow p-6 flex items-center justify-between gap-4 w-full"
    >
      <ark.div className="flex-grow space-y-2">
        <ark.div className="flex gap-2">
          <Field.Root className="w-full">
            <Field.Label className="text-sm font-medium text-gray-700">
              First Name
            </Field.Label>
            <Field.Input
              name="firstName"
              value={editedUser.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-2 py-1 border rounded-md"
            />
          </Field.Root>
          <Field.Root className="w-full">
            <Field.Label className="text-sm font-medium text-gray-700">
              Last Name
            </Field.Label>
            <Field.Input
              name="lastName"
              value={editedUser.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-2 py-1 border rounded-md"
            />
          </Field.Root>
        </ark.div>
        <Field.Root className="w-full">
          <Field.Label className="text-sm font-medium text-gray-700">
            Region
          </Field.Label>
          <Field.Input
            name="region"
            value={editedUser.region}
            onChange={handleInputChange}
            className="mt-1 block w-full px-2 py-1 border rounded-md"
          />
        </Field.Root>
        <Field.Root className="flex items-center gap-2">
          <Field.Input
            name="isActive"
            type="checkbox"
            id={`isActive-${editedUser.id}`}
            checked={editedUser.isActive}
            onChange={handleInputChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <Field.Label
            htmlFor={`isActive-${editedUser.id}`}
            className="text-sm text-gray-900"
          >
            Active
          </Field.Label>
        </Field.Root>
      </ark.div>
      <ark.div className="flex gap-2">
        <ark.button
          type="submit"
          aria-label="Save"
          className="p-2 rounded-full hover:bg-green-100 text-green-600 transition"
        >
          <CheckIcon className="w-5 h-5" />
        </ark.button>
        <ark.button
          type="button"
          aria-label="Cancel"
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
          onClick={onCancel}
        >
          <XMarkIcon className="w-5 h-5" />
        </ark.button>
      </ark.div>
    </ark.form>
  );
} 