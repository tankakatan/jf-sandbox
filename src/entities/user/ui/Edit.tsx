import { ark } from "@ark-ui/react/factory";
import { Field } from "@ark-ui/react/field";
import { Checkbox } from "@ark-ui/react/checkbox";
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
              className={cx("text-sm", "font-medium", "text-gray-600")}
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
                "border-gray-400",
                "rounded-md",
                errors.firstName && "border-red-500 focus:ring-red-500",
              )}
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
            />
            <Field.ErrorText className={cx("text-red-600", "text-xs")}>
              First name cannot be empty
            </Field.ErrorText>
          </Field.Root>
          <Field.Root className={cx("w-full")} invalid={!!errors.lastName}>
            <Field.Label
              className={cx("text-sm", "font-medium", "text-gray-600")}
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
                "border-gray-400",
                "rounded-md",
                errors.lastName && "border-red-500 focus:ring-red-500",
              )}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            <Field.ErrorText className={cx("text-red-600", "text-xs")}>
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
              className={cx("mb-4")}
            />
          )}
        />
        <Controller
          control={control}
          name="isActive"
          render={({ field: { value, onChange } }) => (
            <Field.Root>
              <Checkbox.Root
                id={`isActive-${userId || "new"}`}
                checked={value}
                onCheckedChange={e => onChange(e.checked)}
                className={cx("flex", "items-center", "gap-2", "cursor-pointer")}
              >
                <Checkbox.Control
                  className={cx(
                    "h-5",
                    "w-5",
                    "border",
                    "rounded",
                    "border-gray-400",
                    "bg-white",
                    "transition-colors",
                    "flex",
                    "items-center",
                    "justify-center"
                  )}
                >
                  <Checkbox.Indicator>
                    <CheckIcon className={cx("w-4", "h-4", "text-blue-600","stroke-2")} />
                  </Checkbox.Indicator>
                </Checkbox.Control>
                <Checkbox.Label
                  className={cx("text-sm", "ml-1", "text-gray-600", "cursor-pointer")}
                >
                  Active
                </Checkbox.Label>
                <Checkbox.HiddenInput />
              </Checkbox.Root>
            </Field.Root>
          )}
        />
      </ark.div>
      <ark.div className="flex gap-2">
        <ark.button
          type="submit"
          aria-label="Save"
          className="p-2 rounded-full hover:bg-green-100 text-green-600 transition"
        >
          <CheckIcon className={cx("w-5", "h-5")}/>
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
