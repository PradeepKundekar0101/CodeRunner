import { User } from '../types/user'
const Home = ({user}:{user:User}) => {
  return (
    <div className='bg-black min-h-screen'>
        <h1 className='heading text-4xl text-white'>{`Hello ${user.user_name}`}</h1>
    </div>
  )
}

export default Home