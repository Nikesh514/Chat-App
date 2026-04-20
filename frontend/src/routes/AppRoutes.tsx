import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Landing } from '@/pages/Landing'
import { ChatPage } from '@/pages/ChatPage'
import { Login } from '@/pages/Login'
import { Signup } from '@/pages/Signup'
import { ChatProvider } from '@/store/ChatContext'

export function AppRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route
          path="chat"
          element={
            <ChatProvider>
              <ChatPage />
            </ChatProvider>
          }
        />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  )
}
