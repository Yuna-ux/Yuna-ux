export const metadata = {
  title: 'Lua Remote Executor',
  description: 'Execute Lua code remotely in Roblox',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
