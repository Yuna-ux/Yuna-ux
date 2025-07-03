// app/page.js
import { headers } from 'next/headers'

function debugmsg() {
  console.log("Returning IP...")
}

export default function Home() {
  debugmsg()
  const forwardedFor = headers().get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0].trim() || 'IP not found.'

  return (
    <pre>
      {JSON.stringify({ ip }, null, 2)}
    </pre>
  )
}
