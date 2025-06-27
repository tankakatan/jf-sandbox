import UserList from '../UserList'

const users = [
  { id: 1, firstName: 'Alice', lastName: 'Smith', region: 'Europe', isActive: true },
  { id: 2, firstName: 'Bob', lastName: 'Johnson', region: 'Asia', isActive: false },
  { id: 3, firstName: 'Charlie', lastName: 'Brown', region: 'America', isActive: true },
]

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <UserList users={users} />
      </div>
    </div>
  )
} 