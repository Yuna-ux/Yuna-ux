'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import AuthButton from '../components/AuthButton'
import UserList from '../components/UserList'

const CodeEditor = dynamic(() => import('../components/CodeEditor'), { 
  ssr: false,
  loading: () => <div className="bg-gray-800 h-96 rounded animate-pulse"></div>
})

export default function Home() {
  const { data: session } = useSession()
  const [code, setCode] = useState('print("Hello from web!")')
  const [output, setOutput] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!session) return

    const ws = new WebSocket(`wss://${window.location.host}/api/ws`)

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'auth',
        token: session.user.id
      }))
    }

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.type === 'users') setUsers(data.users)
      if (data.type === 'output') setOutput(prev => [...prev, data.message])
    }

    return () => ws.close()
  }, [session])

  const executeCode = () => {
    if (!selectedUser || !code.trim()) return
    const ws = new WebSocket(`wss://${window.location.host}/api/ws`)
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'execute',
        code: code,
        target: selectedUser,
        token: session.user.id
      }))
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl mb-8">Lua Remote Executor</h1>
        <AuthButton />
      </div>
    )
  }

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl">Welcome, {session.user.name}</h1>
        <AuthButton />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserList 
            users={users} 
            onSelect={setSelectedUser} 
            selected={selectedUser}
          />
        </div>

        <div className="lg:col-span-2">
          <CodeEditor value={code} onChange={setCode} />
          
          <button
            onClick={executeCode}
            disabled={!selectedUser}
            className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded"
          >
            Execute for {selectedUser || '...'}
          </button>

          <div className="mt-6 bg-black p-4 rounded h-48 overflow-y-auto">
            {output.map((line, i) => (
              <pre key={i} className="text-green-400">{line}</pre>
            ))}
          </div>
        </div>
      </div>
    </>
  )
              }
