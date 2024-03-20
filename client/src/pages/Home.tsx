import { User } from '../types/user'
import AllSandBoxs from './AllSandBoxs'
const Home = ({user}:{user:User}) => {
  return (
    <div className="min-h-[50rem] px-8 w-full pb-10 dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col ">

    <div className="absolute pointer-events-none inset-0 flex flex-col dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
    <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center">
      Hey {user.user_name}!
    </p>
        <AllSandBoxs/>
  </div>
   
  )
}

export default Home