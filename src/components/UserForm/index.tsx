import { createListCollection, Field } from "@ark-ui/react";
import { ark } from "@ark-ui/react/factory";
import {
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import cx from "classnames";
import { Controller, useForm } from "react-hook-form";
import type { User as UserType } from "../../@types";
import { useUpsertUser } from "../../atoms/users";
import { Region } from "../../shared";
import FilterableSelect from "../FilterableSelect";

interface UserFormProps {
  user?: UserType;
  onSave: () => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSave, onCancel }: UserFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: user || { isActive: false },
    mode: "onBlur",
  });
  const upsertUser = useUpsertUser();

  const handleSave = (data: UserType) => {
    upsertUser({ ...user, ...data });
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
      className={cx(
        "bg-white",
        "rounded-xl",
        "shadow",
        "p-6",
        "flex",
        "items-center",
        "justify-between",
        "gap-4",
        "w-full",
      )}
    >
      <ark.div className={cx("flex-grow", "space-y-2")}>
        <ark.div className={cx("flex", "gap-2")}>
          <Field.Root className={cx("w-full")} invalid={!!errors.firstName}>
            <Field.Label
              className={cx("text-sm", "font-medium", "text-gray-700")}
            >
              First Name
            </Field.Label>
            <Field.Input
              {...register("firstName", {
                required: "First name is required",
                validate: (v) =>
                  (v && v.trim().length > 0) || "First name is required",
              })}
              className={cx(
                "mt-1",
                "block",
                "w-full",
                "px-2",
                "py-1",
                "border",
                "rounded-md",
                errors.firstName && "border-red-500 focus:ring-red-500",
              )}
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
            />
            <Field.ErrorText className={cx("text-red-600", "text-xs", "mt-1")}>
              First name cannot be empty
            </Field.ErrorText>
          </Field.Root>
          <Field.Root className={cx("w-full")} invalid={!!errors.lastName}>
            <Field.Label
              className={cx("text-sm", "font-medium", "text-gray-700")}
            >
              Last Name
            </Field.Label>
            <Field.Input
              {...register("lastName", {
                required: "Last name is required",
                validate: (v) =>
                  (v && v.trim().length > 0) || "Last name is required",
              })}
              className={cx(
                "mt-1",
                "block",
                "w-full",
                "px-2",
                "py-1",
                "border",
                "rounded-md",
                errors.lastName && "border-red-500 focus:ring-red-500",
              )}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            <Field.ErrorText className={cx("text-red-600", "text-xs", "mt-1")}>
              Last name cannot be empty
            </Field.ErrorText>
          </Field.Root>
        </ark.div>
        <Controller
          control={control}
          name="region"
          rules={{
            required: "Region is required",
            validate: v => !!v || "Region is required",
          }}
          render={({ field: { value, onChange } }) => (
            <FilterableSelect
              value={value}
              onChange={onChange}
              options={regions.items}
              label="Region"
              placeholder="Select a region"
              error={!!errors.region}
              errorText="Please specify user region"
              name="region"
            />
          )}
        />
        <Field.Root className={cx("flex", "items-center", "gap-2")}>
          <Field.Input
            {...register("isActive")}
            type="checkbox"
            id={`isActive-${user?.id || "new"}`}
            className={cx(
              "h-4",
              "w-4",
              "rounded",
              "border-gray-300",
              "text-indigo-600",
              "focus:ring-indigo-600",
            )}
          />
          <Field.Label
            htmlFor={`isActive-${user?.id || "new"}`}
            className={cx("text-sm", "text-gray-900")}
          >
            Active
          </Field.Label>
        </Field.Root>
      </ark.div>
      <ark.div className={cx("flex", "gap-2")}>
        <ark.button
          type="submit"
          aria-label="Save"
          className={cx(
            "p-2",
            "rounded-full",
            "hover:bg-green-100",
            "text-green-600",
            "transition",
          )}
        >
          <CheckIcon className={cx("w-5", "h-5")} />
        </ark.button>
        <ark.button
          type="button"
          aria-label="Cancel"
          className={cx(
            "p-2",
            "rounded-full",
            "hover:bg-gray-100",
            "text-gray-600",
            "transition",
          )}
          onClick={onCancel}
        >
          <XMarkIcon className={cx("w-5", "h-5")} />
        </ark.button>
      </ark.div>
    </ark.form>
  );
}
