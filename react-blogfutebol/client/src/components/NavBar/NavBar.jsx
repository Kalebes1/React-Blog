import { Link } from 'react-router-dom'
import {FaFacebookSquare} from 'react-icons/fa'
import {FaTwitterSquare} from 'react-icons/fa'
import {FaInstagramSquare} from 'react-icons/fa'
import {FaYoutubeSquare} from 'react-icons/fa'
import {FaSearch} from 'react-icons/fa'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

import './index.css'

const PF = "http://localhost:4001/images/"

const NavBar = () => {
  const {user, dispatch} = useContext(AuthContext);

  const handleLogout = () =>{
    dispatch({type:"LOGOUT"})
  }
  return (
    <nav>
          <div className="nav">
            
            <div className="container nav-container">
                <div className="n-left">
                        <a href=""><FaFacebookSquare/></a>
                        <a href=""><FaTwitterSquare/></a>
                        <a href=""><FaInstagramSquare/></a>
                        <a href=""><FaYoutubeSquare/></a>
                </div>
                <div className="n-right">
                  {
                    user ? (
                      <Link to="/settings">
                         <img className='n-image' src={PF + user.profilePic} alt=""  />
                      </Link>
                    ) : (
                      <ul className='n-navList'>
                      <li><Link className='link' to="/login">Login</Link></li>
                      <li><Link className='link' to="/register">Registrar</Link></li>
                      </ul>                    
                    )
                  }
                
                   { user && <div className="n-searchIcon">
                      <FaSearch/>
                    </div>
                    }

                    <ul className='n-navList'>
                    <li><Link to="/" className='link'>HOME</Link></li>
                    <li> <Link to="/write" className='link'>ESCREVER</Link></li>
                    <li><Link to="/" className='link'>SOBRE</Link></li>
                    <li><Link to="/" className='link'>CONTATO</Link></li>
                    <li onClick={handleLogout}>
                      {user && "SAIR"}
                    </li>
                  </ul>
                </div>
            </div>
          </div>


     
</nav>


    
  )
}

export default NavBar