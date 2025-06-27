import { createListCollection } from "@ark-ui/react/collection";
import { ark } from "@ark-ui/react/factory";
import User from "../User";

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  region: string;
  isActive: boolean;
}

export default function UserList({ users }: { users: UserType[] }) {
  const collection = createListCollection({
    items: users,
    itemToString: (i) => String(i.id),
    itemToValue: (i) => String(i.id),
  });
  return (
    <ark.div className="flex flex-col gap-4">
      {collection.items.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </ark.div>
  );
}
