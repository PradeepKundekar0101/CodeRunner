import { Link } from "react-router-dom";
import "../index.css";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login } from "../app/slices/authSlice";
import { Toaster } from "react-hot-toast";
import { notify } from "../utils/notify";
import { useMutation } from "@tanstack/react-query";

import useAuthService from "../hooks/useAuth";
import { validEmail } from "../utils/validEmail";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [user_name, setUser_name] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [user_nameError, setUser_nameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [cpasswordError, setCPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { registerUser } = useAuthService();
  const { mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: registerUser,
    onSuccess: (data) => {
      dispatch(login(data));
      notify("Login Successful", true);
    },
    onError: (data) => {
      notify(data.message, false);
      setLoading(false);
    },
  });
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
    !validEmail(e.target.value) ? setEmailError("Invalid Email Id") : setEmailError(null);
    setEmail(e.target.value);
  }

  function handleUserNameChange(e: ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value;
    if (val.length < 3) setUser_nameError("Minimum 3 characters required");
    else if (val.length > 20)
      setUser_nameError("Maximum 20 characters allowed");
    else setUser_nameError(null);
    setUser_name(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value;
    if (val.length < 6) setPasswordError("Minimum 6 characters required");
    else if (val.length > 20) setPasswordError("Maximum 20 characters allowed");
    else setPasswordError(null);
    setPassword(val);
  }

  function handleCPasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setCPassword(e.target.value);
    e.target.value != password
      ? setCPasswordError("Passwords don't match")
      : setCPasswordError(null);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    mutate({ email, password, user_name });
  };

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
      <Toaster />
      <form className="max-w-sm mx-auto flex-auto" onSubmit={handleSubmit}>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Sign Up
        </p>
        <div className="mb-5">
          <label
            htmlFor="user_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            User Name
          </label>
          <input
            value={user_name}
            onChange={handleUserNameChange}
            type="text"
            id="user_name"
            className="input"
            placeholder="user name"
            required
          />
          <span
            className={`text-red-500 my-2  ${
              user_nameError ? "visible" : "hidden"
            } `}
          >
            {user_nameError}
          </span>
        </div>
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
            className={`text-red-500 my-2  ${
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
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            id="password"
            className="input"
            required
          />
          <span
            className={`text-red-500 my-2  ${
              passwordError ? "visible" : "hidden"
            } `}
          >
            {passwordError}
          </span>
        </div>
        <div className="mb-5">
          <label
            htmlFor="cpassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
           placeholder="confirm password"
            value={cpassword}
            onChange={handleCPasswordChange}
            type="password"
            id="cpassword"
            className="input"
            required
          />
            <span
            className={`text-red-500 my-2  ${
              cpasswordError ? "visible" : "hidden"
            } `}
          >
            {cpasswordError}
          </span>
        </div>
        <button type="submit" className="inline-flex items-center justify-center py-2 px-6 font-medium tracking-wide text-black transition duration-200 bg-white rounded-lg hover:bg-gray-800 hover:text-white focus:shadow-outline focus:outline-none">
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      
        <Link className="text-white my-2 block" to="/signin">
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
