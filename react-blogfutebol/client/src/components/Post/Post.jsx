import './index.css'
import { Link } from 'react-router-dom'
import { option } from '../Date/date'
import { locale } from '../Date/date'
const Post = ({post}) => {

  const PF = "http://localhost:4001/images/"

  return (
    <div className='post'>
      {post.photo && ( 
      <img className="post-img" 
      src={PF + post.photo} 
      alt="" 
      />)}
     
      <div className="post-info">
        <div className="post-cats">
        {post.categories.map((c, index)=>(
            <span className="post-cat" key={index}>{c.name}</span>
          ))}  
        </div>
        <Link to={`/post/${post._id}`} className='link'>
          <span className="post-title">{post.title}</span>
        </Link>
        
        <hr />
        <span className="post-date">{new Date(post.createdAt).toLocaleDateString(locale, option)}</span>
      </div>
      <p className='post-desc'>
        {post.desc}
      </p>
    </div>
  )
}

export default Post