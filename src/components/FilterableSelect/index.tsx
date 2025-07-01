import { createListCollection, Field, Select } from "@ark-ui/react";
import { ark } from "@ark-ui/react/factory";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import cx from "classnames";
import { useMemo, useState } from "react";

interface FilterableSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorText?: string;
  name?: string;
  disabled?: boolean;
}

export default function FilterableSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  error,
  errorText,
  name,
  disabled,
}: FilterableSelectProps) {
  const [filter, setFilter] = useState("");
  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
        itemToString: (i) => i,
        itemToValue: (i) => i,
      }),
    [options],
  );
  const filteredItems = useMemo(() => {
    const term = filter.trim().toLowerCase();
    return term
      ? collection.items.filter((i) => i.toLowerCase().includes(term))
      : collection.items;
  }, [collection, filter]);

  return (
    <Field.Root invalid={error} className={cx("w-full")}>
      {label && (
        <Field.Label className={cx("text-sm", "font-medium", "text-gray-700")}>
          {label}
        </Field.Label>
      )}
      <Select.Root
        collection={collection}
        value={value ? [value] : []}
        onValueChange={(details) => onChange(details.value[0])}
        positioning={{ sameWidth: true }}
        closeOnSelect
        disabled={disabled}
        aria-invalid={error}
        name={name}
      >
        <Select.Control>
          <Select.Trigger
            className={cx(
              "mt-1",
              "relative",
              "w-full",
              "cursor-default",
              "rounded-md",
              "bg-white",
              "py-1.5",
              "pl-3",
              "pr-10",
              "text-left",
              "text-gray-900",
              "shadow-sm",
              "ring-1",
              "ring-inset",
              "ring-gray-300",
              "focus:outline-none",
              "focus:ring-2",
              error
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-600",
              "sm:text-sm",
              "sm:leading-6",
            )}
          >
            <Select.ValueText placeholder={placeholder} />
            <ark.span
              className={cx(
                "pointer-events-none",
                "absolute",
                "inset-y-0",
                "right-0",
                "ml-3",
                "flex",
                "items-center",
                "pr-2",
              )}
            >
              <ChevronUpDownIcon
                className={cx("h-5", "w-5", "text-gray-400")}
                aria-hidden="true"
              />
            </ark.span>
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content
            className={cx(
              "absolute",
              "z-10",
              "mt-1",
              "max-h-60",
              "w-full",
              "overflow-auto",
              "rounded-md",
              "bg-white",
              "text-base",
              "shadow-lg",
              "ring-1",
              "ring-black",
              "focus:outline-none",
              "sm:text-sm",
            )}
          >
            <Field.Root
              className={cx(
                "sticky",
                "top-0",
                "z-10",
                "bg-white",
                "px-0",
                "py-0",
                "flex",
                "items-center",
              )}
            >
              <Field.Label className="sr-only">Filter options</Field.Label>
              <Field.Input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Type to filter..."
                className={cx(
                  "w-full",
                  "rounded-t-md",
                  "border-0",
                  "border-b",
                  "border-gray-300",
                  "bg-white",
                  "py-1.5",
                  "px-3",
                  "text-gray-900",
                  "focus:ring-2",
                  "focus:ring-blue-600",
                  "focus:border-blue-600",
                  "sm:text-sm",
                  "outline-none",
                  "placeholder-gray-400",
                )}
                style={{ boxShadow: "none" }}
              />
              {filter && (
                <ark.button
                  type="button"
                  aria-label="Clear filter"
                  onClick={() => setFilter("")}
                  className={cx(
                    "absolute",
                    "right-2",
                    "top-1/2",
                    "-translate-y-1/2",
                    "p-1",
                    "rounded-full",
                    "hover:bg-gray-100",
                    "focus:outline-none",
                    "focus:ring-2",
                    "focus:ring-blue-600",
                    "text-gray-400",
                  )}
                  tabIndex={0}
                >
                  <XMarkIcon className={cx("w-4", "h-4")} />
                </ark.button>
              )}
            </Field.Root>
            <Select.ItemGroup id="filterable-select">
              {filteredItems.length === 0 && (
                <ark.div
                  className={cx("px-3", "py-2", "text-gray-400", "text-sm")}
                >
                  No options found
                </ark.div>
              )}
              {filteredItems.map((item) => (
                <Select.Item
                  key={item}
                  item={item}
                  className={cx(
                    "group",
                    "relative",
                    "cursor-default",
                    "select-none",
                    "py-2",
                    "pl-3",
                    "pr-9",
                    "text-gray-900",
                    "data-[highlighted]:bg-blue-100",
                    "data-[highlighted]:text-black",
                  )}
                >
                  <Select.ItemText>{item}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon
                      className={cx(
                        "text-blue-600",
                        "absolute",
                        "inset-y-0",
                        "right-0",
                        "pr-4",
                        "h-9",
                        "w-9",
                        "justify-center",
                      )}
                      aria-hidden="true"
                    />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <Field.ErrorText className={cx("text-red-600", "text-xs", "mt-1")}>
        {errorText}
      </Field.ErrorText>
    </Field.Root>
  );
}
