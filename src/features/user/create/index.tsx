import { useForm } from "react-hook-form";
import { Region } from "@/entities/region/enums";
import { useUpsertUser } from "@/entities/user/model/actions";
import type { UserData } from "@/entities/user/types";
import { FormView } from "@/entities/user/ui/Edit";

export default function CreateUserForm({
  onSave,
  onCancel,
}: {
  onSave: () => void;
  onCancel: () => void;
}) {
  const upsert = useUpsertUser();
  const regions = Object.values(Region);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      region: undefined,
      isActive: false,
    },
    mode: "onBlur",
  });

  const values = watch();

  return (
    <FormView
      values={values}
      errors={Object.fromEntries(
        Object.entries(errors).map(([k, v]) => [k, v?.message || ""]),
      )}
      onChange={(field, value) => setValue(field, value)}
      onSubmit={handleSubmit(({ id, ...data }: UserData) => {
        upsert(data as UserData);
        onSave();
      })}
      onCancel={onCancel}
      regions={regions}
    />
  );
}
