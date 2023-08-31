import axios from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';


import './index.css'

const Login = () => {


  const request = axios.create({
    baseURL: 'http://localhost:4001/api/'
  })

  

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  })

  const { loading, error, dispatch} = useContext(AuthContext);

  const handleChange = (e)=>{
    setCredentials(prev=>({...prev, [e.target.id]: e.target.value}))
  }

  const handleClick = async e =>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try{
      const res = await request.post(
        "auth/login",
         credentials)
      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
      
     
    }catch(err){
      dispatch({type:"LOGIN_FAILURE", payload: err.response.data});
    }

  }



  
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className='loginForm' >
        {error && <span className='login_error'>{error}</span>}
            <label>Email</label>
            <input type="text" 
            className='loginInput' 
            id='email'
            onChange={handleChange}
            placeholder='Digite seu email...'

             />

            <label>Senha</label>
            <input type="password" 
            className='loginInput'
            id='password'
            onChange={handleChange}
            placeholder='Digite sua senha...' 

            />

            <button className='loginButton' type='submit' onClick={handleClick} disabled={loading}>Login</button>
            
        </form>
        <button  className='loginRegisterButton'><Link to='/register' className='link'>Registre</Link></button>
        
      
    </div>
   
  )
}

export default Login;