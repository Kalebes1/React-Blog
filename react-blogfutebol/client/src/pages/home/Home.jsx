import { useEffect, useState } from 'react'
import Posts from '../../components/Posts/Posts'
import Aside from '../../components/Aside/Aside'
import Header from '../../components/Header/Header'
import './index.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'


const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();


  const request = axios.create({
    baseURL: 'http://localhost:4001/api/'
  })

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await request.get(`/posts`+search)
      setPosts(res.data)
    }
    fetchPosts()
  },[search])
  return (
    <>
      <Header/>
      <div className=' home container'>
        <Posts posts={posts} />
        <Aside/>
      </div>
    </>  
)}

export default Home