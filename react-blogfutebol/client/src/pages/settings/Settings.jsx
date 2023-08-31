import Aside from '../../components/Aside/Aside'
import image from '../../assets/images/futebol1.jpg'
import {BiUserCircle} from 'react-icons/bi'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

import './index.css'


const Settings = () => {

    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false);

    const request = axios.create({
        baseURL: 'http://localhost:4001/api/'
      })
      const PF = "http://localhost:4001/images/"

    const {user, dispatch} = useContext(AuthContext)

    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
          userId: user._id,
          username,
          email,
          password
        };
        if(file){
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name",filename);
          data.append("file",file);
          updatedUser.profilePic = filename;
          try{
            await request.post("upload", data)
          }catch(err){
    
          }
        }
        try{
            const res = await request.put("/users/"+user._id, updatedUser); 
            setSuccess(true)
            dispatch({type:"UPDATE_SUCCESS", payload: res.data})
        }catch(err){
            dispatch({type:"UPDATE_FAILURE"})
        }
        
      }

  return (
    <section className='settings'>
        <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Atualize sua conta</span>
                    <span className="settingsDeleteTitle">Delete sua conta</span>
                </div>
                <form className='settingsForm' onSubmit={handleSubmit}>
                    <label>Foto de Perfil</label>
                    <div className="settingsPP">
                        <img 
                        src={file ? URL.createObjectURL(file) : PF+user.profilePic}
                        alt="" 
                        />
                        <label htmlFor="fileInput">
                            <div className="settingsPPIcon"><BiUserCircle/></div>
                        </label>
                        <input 
                        type="file" 
                        id="fileInput"
                         style={{display: "none"}}
                         onChange={e=>setFile(e.target.files[0])}
                         />
                    </div>
                    <label>Nome</label>
                    <input type="text" placeholder={user.username} 
                    onChange={e=>setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email} 
                    onChange={e=>setEmail(e.target.value)}/>
                    <label>Senha</label>
                    <input type="password"
                    onChange={e=>setPassword(e.target.value)}/>
                    <button className='settingsSubmit' type='submit'>
                        Update
                    </button>
                    {success && <span className='success'>Perfil atualizado com sucesso!</span>}
                </form>
        </div>
        <Aside/>
    </section>
  )
}

export default Settings