import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Chat } from './pages/chat/chat'
import ProfileUpdate from './pages/profileUpdate/ProfileUpdate'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/profile' element={<ProfileUpdate/>}/>
      </Routes>
    </>
  )
}

export default App