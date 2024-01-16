import { Link } from "react-router-dom";
import "../index.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserService } from "../service/user";
import { useAppDispatch } from "../app/hooks";
import {login} from '../app/slices/authSlice'
import { notify } from "../utils/notify";
import { Toaster } from "react-hot-toast";
const SignIn = () => {
    const dispatch = useAppDispatch();
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [emailError,setEmailError] = useState<string | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(e.target.value))
            setEmailError("Invalid Email Id");
        else setEmailError(null);
            setEmail(e.target.value);
    }
    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
        setPassword(e.target.value);
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
          
          setLoading(true);
          const response = await UserService.loginUser({ email, password });
          dispatch(login(response));
          setLoading(false);
          notify("User logined!",true);
      } catch (error:any) {
          console.log(error)
          notify(error.message,false);
          setLoading(false);
      }
  }


  return (
    <div className="bg-black h-[80vh] flex items-center justify-center ">
      <Toaster/>
      <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
        <h1 className="text-7xl my-10 text-white font-extrabold">Login</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
          value={email}
            onChange={handleEmailChange}
            type="email"
            id="email"
            className="input"
            placeholder="name@codezone.com"
            required
          />
          <span className={`text-red-400 my-2  ${emailError?'visible' :'hidden'} `}>{emailError}</span>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input value={password} onChange={handlePasswordChange} type="password" id="password" className="input" required />
        </div>

        <button type="submit" className="btn-primary">
          { loading?"Logging in..." : "Login"}
        </button>

        <Link className="text-blue-200 my-2 block" to="/signup">
          Create an account
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
