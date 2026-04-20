import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'

export function MainLayout(): React.ReactElement {
  return (
    <div className="flex min-h-svh flex-col bg-surface">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
