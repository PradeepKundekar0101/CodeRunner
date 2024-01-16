import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../app/slices/authSlice";
const NavBar = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => {
    return state.auth.token;
  });
  return (
    <nav className="flex justify-between items-center py-3 px-10 bg-slate-800 text-white">
      <div>
        {" "}
        <Link to={"/"}>
          {" "}
          <h3 className=" text-lg font-bold">
            <span className="text-green-500 text-3xl">C</span>ode
            <span className="text-3xl text-green-500">Z</span>one
          </h3>
        </Link>{" "}
      </div>
      <div>
        <ul className="flex items-center space-x-3">
          <li>
            <Link to={"/"}>Home</Link>
          </li>

          {token && (
            <>
              <li>
                <Link to={"/sandbox"}>SandBox</Link>
              </li>{" "}
              <button
                onClick={() => {
                  dispatch(logout());
                }}
                className=" bg-red-500 py-1 px-2 rounded-md"
              >
                Logout
              </button>
            </>
          )}
          {!token && (
            <>
              <li>
                <Link to={"/signin"}>Login</Link>
              </li>
              <li>
                <Link to={"/signup"}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
