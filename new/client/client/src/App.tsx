import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
// import React from 'react'
import Home from './components/Home'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Game from './components/Game'
import MainMenu from './components/MainMenu'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import { logout } from './features/authSlice'
import { useDispatch } from 'react-redux'


function App() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      if (!response.ok) {
        console.error('Logout failed on server side')
      }
    } catch (error) {
      console.log('Logout failed:', error)
    } finally {
      dispatch(logout())
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
        <Route path="/signup" element={<SignUp user={user} isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
        <Route path="/signin" element={<LogIn user={user} isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
        <Route path="/categories" element={<MainMenu user={user} isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
        <Route path="/game/:categoryId/:name" element={<Game user={user} isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
