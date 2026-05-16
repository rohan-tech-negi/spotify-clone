// import { Button } from "@/components/ui/button"
import { AuthenticateWithRedirectCallback, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
import MainLayout from './layout/MainLayout'
import ChatPage from './pages/chatpage/ChatPage'
import AlbumPage from './pages/album/AlbumPage'
import AdminPage from './pages/admin/AdminPage'

function App() {
  
  return (
   <>
    <Routes>
      
      <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback  signInForceRedirectUrl={"/auth-callback"}/>} />
      <Route path='/auth-callback' element={<AuthCallbackPage />} />
      <Route path='/admin' element={<AdminPage />} />

      <Route  element={<MainLayout />} >
          <Route path='/' element={<HomePage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/albums/:albumId' element={<AlbumPage />} />
          
      </Route>
      
    </Routes>
   </>
  )
}

export default App
