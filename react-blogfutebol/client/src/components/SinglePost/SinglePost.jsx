import {AiOutlineEdit} from 'react-icons/ai'
import {AiOutlineDelete} from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { option } from '../Date/date'
import { locale } from '../Date/date'
import { Link } from 'react-router-dom'
import './index.css'
import { AuthContext } from '../../context/AuthContext'

const SinglePost = () => {

    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const PF = "http://localhost:4001/images/"
    const {user} = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);


    const request = axios.create({
        baseURL: 'http://localhost:4001/api/'
      })

    useEffect(()=>{
        const getPost = async ()=>{
            const res = await request.get("/posts/"+path)
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    },[path])

    const handleDelete = async ()=>{
        try{
            await request.delete(`/posts/${post._id}`, {
                data: { username: user.username },
              });
            window.location.replace("/");
        }catch(err){}
    };

    const handleUpdate = async () => {
        try {
          await request.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
          });
          setUpdateMode(false)
        } catch (err) {}
      };
    

  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
            {post.photo && (
            <img 
            src={PF + post.photo} 
            alt="" 
            className="singlePostImg" />
            )}{
                updateMode ? (
                <input 
                type="text" 
                value={title} 
                className="singlePostTitleInput"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                />
                
                 )
                : (
                    <h1 className='singlePostTitle'>
                    {title}
                    {post.username == user?.username && (
                        <div className="singlePostEdit">
                        <AiOutlineEdit onClick={() => setUpdateMode(true)}/>
                        <AiOutlineDelete onClick={handleDelete}/>
                    </div>
                    )}
                    
                </h1>
                )
            }
            
          
            <div className="singlePostInfo">
                <span className='singlePostAuthor'>Autor: 
                <Link to={`/?user=${post.username}`} className="link">
                    <b> {post.username} </b>
                </Link>
                </span>
                <span className='singlePostDate'>
                    {new Date(post.createdAt).toLocaleDateString(locale, option)}
                </span>
            </div>
            {updateMode ? (
            <textarea
                className="singlePostDescInput"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            ) : (
            <p className="singlePostDesc">{desc}</p>
            )}
             {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>
                    Update
                </button>
             )}
         
        </div>
    </div>
  )
}

export default SinglePost