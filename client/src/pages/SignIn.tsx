import { Link } from "react-router-dom";
import "../index.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login } from "../app/slices/authSlice";
import { notify } from "../utils/notify";
import { Toaster } from "react-hot-toast";
import { validEmail } from "../utils/validEmail";
import {useMutation} from '@tanstack/react-query'
import useAuthService from "../hooks/useAuth";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { loginUser } = useAuthService();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
    !validEmail(e.target.value) ? setEmailError("Invalid Email Id") : setEmailError(null);
    setEmail(e.target.value);
  }
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }
  const {mutate} = useMutation({
    mutationKey:["sigin"],
    mutationFn:loginUser,
    onSuccess:(data)=>{
      dispatch(login(data));
      notify("Login Successfull",true);
    },
    onError:(data:any)=>{
      // console.log(data)
      notify(data.message,false);
      setLoading(false);
    }
  })
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    mutate({email,password});
  };
  const handleGuestLogin = ()=>{
    setLoading(true);
    mutate({email:"coderbro@gmail.com",password:"123456"});
  }
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Toaster />
      <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Login
        </p>
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
            placeholder="name@example.com"
            required
          />
          <span
            className={`text-red-400 my-2  ${
              emailError ? "visible" : "hidden"
            } `}
          >
            {emailError}
          </span>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>

          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            id="password"
            className="input"
            required
          />
        </div>
        <button className="inline-flex items-center justify-center py-2 px-6 font-medium tracking-wide text-black transition duration-200 bg-white rounded-lg hover:bg-gray-800 hover:text-white focus:shadow-outline focus:outline-none">
          {loading ? "Logging in..." : "Login"}
        </button>
        <button type="button" onClick={handleGuestLogin} className="inline-flex ml-2 items-center justify-center py-2 px-6 font-medium tracking-wide  transition duration-200 bg-black text-white rounded-lg hover:bg-gray-800 hover:text-white focus:shadow-outline focus:outline-none">
          {loading ? "Logging in..." : "Guest User"}
        </button>

        <Link className="text-white my-2 block" to="/signup">
          Create an account
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
