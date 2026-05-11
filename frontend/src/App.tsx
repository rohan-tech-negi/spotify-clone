// import { Button } from "@/components/ui/button"
import { AuthenticateWithRedirectCallback, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'

function App() {
  
  return (
   <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback  signInForceRedirectUrl={"/auth-callback"}/>} />
      <Route path='/auth-callback' element={<AuthCallbackPage />} />
      
    </Routes>
   </>
  )
}

export default App
