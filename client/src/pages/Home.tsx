import { User } from '../types/user'
import AllSandBoxs from './AllSandBoxs'
const Home = ({user}:{user:User}) => {
  return (
    <div className='bg-black min-h-screen px-10'>
        <h1 className='heading text-4xl py-10 text-white'>{`Hello ${user.user_name}`}</h1>
        <AllSandBoxs/>
    </div>
  )
}

export default Home