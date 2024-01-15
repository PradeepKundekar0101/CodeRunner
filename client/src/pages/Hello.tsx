import { Link } from "react-router-dom"

const Hello = () => {
  return (
    <div>
        Hello Coder!
        <Link to='/signin'>Login</Link>
        <Link to='/register'>Register</Link>
    </div>
  )
}

export default Hello