import { useForm } from "react-hook-form";
import { Region } from "@/entities/region/enums";
import { useUpsertUser } from "@/entities/user/model/actions";
import type { UserData, UserFormData } from "@/entities/user/types";
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
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      region: undefined,
      isActive: false,
    },
    mode: "onBlur",
  });

  return (
    <FormView
      register={register}
      control={control}
      errors={Object.fromEntries(
        Object.entries(errors).map(([k, v]) => [k, v?.message || ""]),
      )}
      onChange={(field, value) => setValue(field, value)}
      onSubmit={handleSubmit((data: UserFormData) => {
        upsert(data as UserData);
        onSave();
      })}
      onCancel={onCancel}
      regions={regions}
    />
  );
}
