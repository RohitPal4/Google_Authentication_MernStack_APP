import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import './App.css'
import GoogleLogin from './component/GoogleLogin'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Dashboard from './page/Dashboard'
import Notfoundpage from './page/Notfoundpage'
import { useState } from 'react'
import RefressHandler from './component/RefressHandler'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const GoogleAuthWrapper = ()=>{
    return (
      <GoogleOAuthProvider clientId='809624308708-b9mlfkf82am1rn9n67u8t0m2behchdbk.apps.googleusercontent.com'>
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    )
  }

  const PrivateRoute = ({element})=>{
    return isAuthenticated? element: <Navigate to="/login" />
  }

  return (
    <BrowserRouter>
    <RefressHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/login' element={<GoogleAuthWrapper />} />
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
      <Route path='*' element={<Notfoundpage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
