import { Link } from "react-router-dom"

const Hello = () => {
  return (
    <div className="bg-black  w-full min-h-screen flex justify-center items-center flex-col">
       <h1 className="text-white font-extrabold text-7xl"> Hello Coder!  </h1>
       <div className="flex space-x-3 my-10">

        <Link className="bg-white py-1 px-5 text-xl text-black" to='/signin'>Login</Link>
        <Link className="bg-green-500 py-1 px-5 text-xl text-white" to='/signup'>Register</Link>
        </div>
    </div>
  )
}

export default Hello