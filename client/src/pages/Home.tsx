import { User } from '../types/user'
const Home = ({user}:{user:User}) => {
  return (
    <div>
        <h1 className='heading'>{`Hello ${user.user_name}`}</h1>
    </div>
  )
}

export default Home