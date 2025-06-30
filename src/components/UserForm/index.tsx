import { createListCollection, Field, Select } from "@ark-ui/react";
import { ark } from "@ark-ui/react/factory";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import cx from "classnames";
import { Controller, useForm } from "react-hook-form";
import type { User as UserType } from "../../@types";
import { useUpdateUser } from "../../atoms/users";
import { Region } from "../../shared";

interface UserFormProps {
  user: UserType;
  onSave: () => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSave, onCancel }: UserFormProps) {
  const { register, handleSubmit, control } = useForm<UserType>({
    defaultValues: user,
  });
  const updateUser = useUpdateUser();

  const handleSave = (data: UserType) => {
    updateUser({ ...user, ...data });
    onSave();
  };

  const regions = createListCollection<Region>({
    items: Object.values(Region),
    itemToString: (i) => i,
    itemToValue: (i) => i,
  });

  return (
    <ark.form
      onSubmit={handleSubmit(handleSave)}
      className="bg-white rounded-xl shadow p-6 flex items-center justify-between gap-4 w-full"
    >
      <ark.div className="flex-grow space-y-2">
        <ark.div className="flex gap-2">
          <Field.Root className="w-full">
            <Field.Label className="text-sm font-medium text-gray-700">
              First Name
            </Field.Label>
            <Field.Input
              {...register("firstName")}
              className="mt-1 block w-full px-2 py-1 border rounded-md"
            />
          </Field.Root>
          <Field.Root className="w-full">
            <Field.Label className="text-sm font-medium text-gray-700">
              Last Name
            </Field.Label>
            <Field.Input
              {...register("lastName")}
              className="mt-1 block w-full px-2 py-1 border rounded-md"
            />
          </Field.Root>
        </ark.div>
        <Controller
          control={control}
          name="region"
          render={({ field: { value, onChange } }) => (
            <Select.Root
              collection={regions}
              value={[value]}
              onValueChange={(details) => onChange(details.value[0])}
              positioning={{ sameWidth: true }}
              closeOnSelect
            >
              <Select.Label className="text-sm font-medium text-gray-700">
                Region
              </Select.Label>
              <Select.Control>
                <Select.Trigger
                  className={cx(
                    "mt-1 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6",
                  )}
                >
                  <Select.ValueText placeholder="Select a region" />
                  <ark.span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </ark.span>
                </Select.Trigger>
              </Select.Control>
              <Select.Positioner className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <Select.Content>
                  <Select.ItemGroup id="region">
                    {regions.items.map((region) => (
                      <Select.Item
                        key={region}
                        item={region}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[highlighted]:bg-indigo-600 data-[highlighted]:text-white"
                      >
                        <Select.ItemText>{region}</Select.ItemText>
                        <Select.ItemIndicator>
                          <CheckIcon
                            className="h-5 w-5 absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[highlighted]:text-white"
                            aria-hidden="true"
                          />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.ItemGroup>
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          )}
        />
        <Field.Root className="flex items-center gap-2">
          <Field.Input
            {...register("isActive")}
            type="checkbox"
            id={`isActive-${user.id}`}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <Field.Label
            htmlFor={`isActive-${user.id}`}
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
