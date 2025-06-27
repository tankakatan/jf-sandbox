import User from '../User'

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  region: string;
  isActive: boolean;
}

export default function UserList({ users }: { users: UserType[] }) {
  return (
    <div className="flex flex-col gap-4">
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </div>
  )
} 