import { useEffect, useState } from 'react'
import {FaFacebookSquare} from 'react-icons/fa'
import {FaTwitterSquare} from 'react-icons/fa'
import {FaInstagramSquare} from 'react-icons/fa'
import {FaYoutubeSquare} from 'react-icons/fa'
import axios from 'axios'
import './index.css'
import { Link } from 'react-router-dom'

const Aside = () => {
  const [cats, setCats] = useState([]);

  const request = axios.create({
    baseURL: 'http://localhost:4001/api'
  })

  useEffect(()=>{
    const getCats = async()=>
    {
      const res = await request.get("/categories")
      setCats(res.data)
    }
    getCats()
  },[])
  return (
    <div className='aside'>
      <div className="asideItem">
          <span className='asideTitle'>ABOUT ME</span>
          <img src="https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti commodi quo velit quis eaque nulla aspernatur.</p>
      </div>

    <div className="asideItem">
       <span className='asideTitle'>CATEGORIES</span>
       <ul className="asideList">
            {cats.map((c, index)=>(
              <Link to={`/?cat=${c.name}`} className='link' key={index}>
                <li className='asideListItem' >{c.name}</li>
              </Link>
               
            ))}
 
       </ul>
    </div>

    <div className="asideItem">
       <span className='asideTitle'>Siga-nos</span>
              <div className="asideSocial">
                    <a href="" ><FaFacebookSquare/></a>
                    <a href="" ><FaTwitterSquare/></a>
                    <a href="" ><FaInstagramSquare/></a>
                    <a href="" ><FaYoutubeSquare/></a>
              </div>
    </div>
      
    </div>
  )
}

export default Aside