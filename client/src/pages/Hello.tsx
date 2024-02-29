import { Link } from "react-router-dom"

const Hello = () => {
  return (
    <div className="h-[50rem] flex flex-col w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative  items-center justify-center">
    <div className="absolute  pointer-events-none inset-0 flex flex-col  items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
      Hello Coder!
     
    </p>
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Link to={"/signin"} className="w-40 flex items-center justify-center h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Login
        </Link>
        <Link to={"/signup"} className="w-40 h-10 flex items-center justify-center rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </Link>
      </div>
  </div>

  )
}

export default Hello