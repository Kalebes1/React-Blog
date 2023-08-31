import { Link } from 'react-router-dom'
import image from '../../assets/images/futebol.jpg'
import image2 from '../../assets/images/futebol1.jpg'
import image3 from '../../assets/images/futebol2.jpg'

import './index.css'

const Header = () => {

  return (
    <header>
         <div className="container h-space">

           {/**   SECOND NAV   */}
           <div className="h-container ">
                    <div className="h-left">
                          <div className="h1">
                            <Link to="/">
                               PortalFut
                            </Link>
                          </div>
                    </div>
                    <div className="h-right">
                        <ul className='h-list'>
                          <li className='h-list-item'>INTERNACIONAL</li>
                          <li className='h-list-item'>BRASILEIRÃO</li>
                          <li className='h-list-item'>SELEÇÃO</li>
                          <li className='h-list-item'>COPA DO BRASIL</li>
                        </ul>
                    </div>
                </div>


{/** NEWS PANEL  */}
        <div className="h-area">
          <div className="h-area--image1" style={{backgroundImage: `linear-gradient(45deg,rgba(77,178,236,0.6),rgba(74,143,94,0.6)), url(${image})`}}>
            <div className="h-category">Futebol Brasileiro</div>
            <div className="h-title">Com lesão no ligamento e edema ósseo, Neymar tem retorno à Copa incerto</div>
            <div className="h-date">1 de Setembro de 2021</div>
          </div>
          <div className="h-area--image2" style={{backgroundImage: `linear-gradient(90deg,rgba(232, 111, 111, 0.6),rgba(232, 151, 111,0.6)),url(${image2})`}}>
          <div className="h-category">Futebol Brasileiro</div>
            <div className="h-title">Brasil chega a 16 jogos sem perder e iguala maior sequência invicta entre seleções da Copa</div>
            <div className="h-date">1 de Setembro de 2021</div>
          </div>
          <div className="h-area--image3" style={{backgroundImage: `linear-gradient(90deg,rgba(111, 214, 232,0.6),rgba(123, 111, 232,0.6)),url(${image3})`}}>
          <div className="h-category">Futebol Brasileiro</div>
            <div className="h-title">Richarlison faz golaço de voleio e Brasil vence Sérvia por 2 a 0 na estreia</div>
            <div className="h-date">1 de Setembro de 2021</div>
          </div>
        </div>
    </div>
  </header>

  )
}

export default Header