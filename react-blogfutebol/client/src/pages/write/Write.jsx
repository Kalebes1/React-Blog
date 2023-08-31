import { useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import image from '../../assets/images/futebol1.jpg'
import axios from 'axios';
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';


import './index.css'


const Write = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const {user} = useContext(AuthContext);

  const request = axios.create({
    baseURL: 'http://localhost:4001/api/'
  })

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc
    };
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name",filename);
      data.append("file",file);
      newPost.photo = filename;
      try{
        await request.post("upload", data)
      }catch(err){

      }
    }
    try{
      const res = await request.post("/posts", newPost);
      window.location.replace("/post/"+res.data._id);
    }catch(err){

    }
    
  }

  return (
    <section className='write'>
      {file && <img className='writeImg' src={URL.createObjectURL(file)} alt="" />}
      
        <form className='writeForm' onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <div className="writeIcon"><AiOutlinePlus/></div>
                </label>
                <input type="file"
                 id='fileInput'
                  style={{display:"none"}} 
                  onChange={e=>setFile(e.target.files[0])} 
                  />

                <input type="text"
                 placeholder='Title' 
                 className='writeInput' 
                 autoFocus={true}
                 onChange={e=>setTitle(e.target.value)}
                 />

            </div>
            <div className="writeFormGroup">
              <textarea 
              placeholder='Escreva sua história...' 
              typeof='text' 
              className='writeInput writeText'
              onChange={e=>setDesc(e.target.value)}
              ></textarea>
            </div>
            <button className='writeSubmit' type='submit'>Publicar</button>
        </form>
    </section>
  )
}

export default Write