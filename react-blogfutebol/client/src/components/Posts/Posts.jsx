import Post from '../Post/Post'
import './index.css'

const Posts = ({posts}) => {
  return (
    <section className='posts'>
        {posts.map((p, index)=>(
           <Post 
           post={p} 
           key={index}
           />
        ))}
        

         
    </section>
    
  )
}

export default Posts