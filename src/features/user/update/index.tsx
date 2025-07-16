import { useForm } from "react-hook-form";
import { Region } from "@/entities/region/enums";
import { useUpsertUser } from "@/entities/user/model/actions";
import { useUserById } from "@/entities/user/model/selectors";
import type { UserFormData } from "@/entities/user/types";
import { FormView } from "@/entities/user/ui/Edit";

export default function UpdateUserForm({
  userId,
  onSave,
  onCancel,
}: {
  userId: number;
  onSave: () => void;
  onCancel: () => void;
}) {
  const user = useUserById(userId);
  const upsert = useUpsertUser();
  const regions = Object.values(Region);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: user,
    mode: "onBlur",
  });

  if (!user) return null;

  return (
    <FormView
      userId={user.id}
      register={register}
      control={control}
      errors={Object.fromEntries(
        Object.entries(errors).map(([k, v]) => [k, v?.message || ""]),
      )}
      onChange={(field, value) => setValue(field, value)}
      onSubmit={handleSubmit((data) => {
        upsert({ ...user, ...data });
        onSave();
      })}
      onCancel={onCancel}
      regions={regions}
    />
  );
}
