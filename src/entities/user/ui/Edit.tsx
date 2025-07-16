import { ark } from "@ark-ui/react/factory";
import { Field } from "@ark-ui/react/field";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { type Control, Controller, type useForm } from "react-hook-form";
import type { Region } from "@/entities/region/enums";
import FilterableSelect from "@/shared/ui/FilterableSelect";
import type { UserFormData } from "../types";

interface FormViewProps {
  userId?: number;
  register: ReturnType<typeof useForm<UserFormData>>["register"];
  control: Control<UserFormData>;
  errors?: ReturnType<typeof useForm<UserFormData>>["formState"]["errors"];
  onChange: (
    field: keyof UserFormData,
    value: UserFormData[typeof field],
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
  regions: Region[];
}

export function FormView({
  userId,
  register,
  control,
  errors = {},
  onSubmit,
  onCancel,
  regions,
}: FormViewProps) {
  return (
    <ark.form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
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
            validate: (v) => !!v || "Region is required",
          }}
          render={({ field: { value, onChange } }) => (
            <FilterableSelect
              value={value}
              onChange={onChange}
              options={regions}
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
            id={`isActive-${userId || "new"}`}
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
            htmlFor={`isActive-${userId || "new"}`}
            className={cx("text-sm", "text-gray-900")}
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
