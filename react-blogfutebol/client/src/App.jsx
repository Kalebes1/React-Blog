import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/Register/Register'
import Settings from './pages/settings/Settings'
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const {user} = useContext(AuthContext);
  return (
    <>
     
       <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route index element={<Home/>} />
            <Route path='/login' element={user ? <Home/> : <Login/>} />
            <Route path='/register' element={user ? <Home/> : <Register/>} />
            <Route path='/write' element={user ? <Write/> : <Register/>}  />
            <Route path='/settings' element={<Settings/>} />
            <Route path='/post/:postId' element={<Single/>} />
          </Routes>
       </BrowserRouter>
    
    </>
   
  )
}

export default App