import { ark } from "@ark-ui/react/factory";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import type { Region } from "@/entities/region/enums";
import FilterableSelect from "@/shared/ui/FilterableSelect";
import type { UserFormData } from "../types";

interface FormViewProps {
  values: UserFormData;
  errors?: Partial<Record<keyof UserFormData, string>>;
  onChange: (field: keyof UserFormData, value: UserFormData[typeof field]) => void;
  onSubmit: () => void;
  onCancel: () => void;
  regions: Region[];
}

export function FormView({
  values,
  errors = {},
  onChange,
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
          <ark.div className="w-full">
            <ark.label
              htmlFor="firstName-input"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </ark.label>
            <ark.input
              id="firstName-input"
              value={values.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              className={cx(
                "mt-1 block w-full px-2 py-1 border rounded-md",
                errors.firstName && "border-red-500 focus:ring-red-500",
              )}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <ark.div className="text-red-600 text-xs mt-1">
                {errors.firstName}
              </ark.div>
            )}
          </ark.div>
          <ark.div className="w-full">
            <ark.label
              htmlFor="lastName-input"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </ark.label>
            <ark.input
              id="lastName-input"
              value={values.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              className={cx(
                "mt-1 block w-full px-2 py-1 border rounded-md",
                errors.lastName && "border-red-500 focus:ring-red-500",
              )}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <ark.div className="text-red-600 text-xs mt-1">
                {errors.lastName}
              </ark.div>
            )}
          </ark.div>
        </ark.div>
        <FilterableSelect
          value={values.region}
          onChange={val => onChange("region", val as Region)}
          options={regions}
          label="Region"
          placeholder="Select a region"
          error={!!errors.region}
          errorText={errors.region}
          name="region"
        />
        <ark.label htmlFor="isActive-input" className="flex items-center gap-2">
          <ark.input
            id="isActive-input"
            type="checkbox"
            checked={values.isActive}
            onChange={(e) => onChange("isActive", e.target.checked)}
          />
          Active
        </ark.label>
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
