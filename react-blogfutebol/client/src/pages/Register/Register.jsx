import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './index.css'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail ] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const request = axios.create({
    baseURL: 'http://localhost:4001/api/'
  })

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError(false)
    try{
      const res = await request.post("auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login")
    }catch(err){
      
      if(err.code == "ERR_BAD_REQUEST"){
        setError("Usuário já cadastrado")
      }else{
        setError("Error Servidor. Tente novamente mais tarde")
      }
    }
  }

  return (
    <div className='register'>
        <span className="registerTitle">registrar</span>
        <form className='registerForm' onSubmit={handleSubmit}>

            {error != "" && <div className="register_error">{error}</div>}

            <label>Nome</label>
            <input type="text" 
            className='registerInput' 
            placeholder='Digite seu nome...' 
            onChange={e=>setUsername(e.target.value)}
            />

            <label>Email</label>
            <input type="text" 
            className='registerInput' 
            placeholder='Digite seu email...' 
            onChange={e=>setEmail(e.target.value)}
            />
            
            <label>Senha</label>
            <input type="password" 
            className='registerInput' 
            placeholder='Digite sua senha...' 
            onChange={e=>setPassword(e.target.value)}
            />


            <button className='registerButton' type='submit'>Registre</button>
        </form>
        <button className='registerLoginButton'><Link to='/login' className='link'>Login</Link></button>
      
    </div>
  )
}

export default Register