export default function UserList({ users, onSelect, selected }) {
  return (
    <div className="border rounded p-4">
      <h2 className="text-lg mb-2">Usuários Conectados</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li 
            key={user.id}
            onClick={() => onSelect(user.id)}
            className={`p-2 cursor-pointer rounded ${
              selected === user.id ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
