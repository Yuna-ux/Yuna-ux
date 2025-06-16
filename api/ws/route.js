import { WebSocketServer } from 'ws'
import { NextResponse } from 'next/server'

const users = new Map()
const PASSWORD = process.env.WS_PASSWORD || 'default123'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!global.wss) {
    global.wss = new WebSocketServer({ noServer: true })

    global.wss.on('connection', (ws) => {
      const userId = `user_${Math.random().toString(36).substr(2, 9)}`
      users.set(ws, { id: userId })
      broadcastUsers()

      ws.on('message', (data) => {
        const message = JSON.parse(data)
        
        if (message.type === 'auth') {
          users.set(ws, { 
            ...users.get(ws), 
            name: message.name,
            password: message.password
          })
          broadcastUsers()
        }

        if (message.type === 'execute') {
          if (message.password !== PASSWORD) {
            ws.send(JSON.stringify({
              type: 'output',
              message: '❌ Senha incorreta!'
            }))
            return
          }

          const target = [...users.values()].find(u => u.id === message.target)
          if (target) {
            target.ws.send(JSON.stringify({
              type: 'execute',
              code: message.code
            }))
          }
        }
      })

      ws.on('close', () => {
        users.delete(ws)
        broadcastUsers()
      })
    })
  }

  return NextResponse.json({ success: true })
}

function broadcastUsers() {
  const usersList = [...users.values()]
    .filter(u => u.name)
    .map(u => ({ id: u.id, name: u.name }))
  
  global.wss.clients.forEach(client => {
    client.send(JSON.stringify({
      type: 'users',
      users: usersList
    }))
  })
}
