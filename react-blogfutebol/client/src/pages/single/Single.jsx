import Aside from '../../components/Aside/Aside'
import SinglePost from '../../components/SinglePost/SinglePost'

import './index.css'

const Single = () => {
  return (
    <div className='container single'>
        <SinglePost/>
        <Aside/>
    </div>
  )
}

export default Single