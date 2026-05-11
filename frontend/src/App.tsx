// import { Button } from "@/components/ui/button"
import { AuthenticateWithRedirectCallback, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
import MainLayout from './layout/MainLayout'

function App() {
  
  return (
   <>
    <Routes>
      
      <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback  signInForceRedirectUrl={"/auth-callback"}/>} />
      <Route path='/auth-callback' element={<AuthCallbackPage />} />

      <Route  element={<MainLayout />} >
          <Route path='/' element={<HomePage />} />
      </Route>
      
    </Routes>
   </>
  )
}

export default App
