import { Link } from "react-router-dom";
import "../index.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserService } from "../service/user";
import { useAppDispatch } from "../app/hooks";
import { login } from '../app/slices/authSlice';

const SignUp = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpassword, setCPassword] = useState<string>("");
    const [user_name, setUser_name] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [user_nameError, setUser_nameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e.target.value))
            setEmailError("Invalid Email Id");
        else setEmailError(null);
        setEmail(e.target.value);
    }

    function handleUserNameChange(e: ChangeEvent<HTMLInputElement>): void {
        const val = e.target.value;
        if (val.length < 3)
            setUser_nameError("Minimum 3 characters required");
        else if (val.length > 20)
            setUser_nameError("Maximum 20 characters allowed");
        else setUser_nameError(null);
        setUser_name(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
        const val = e.target.value;
        if (val.length < 6)
            setPasswordError("Minimum 6 characters required");
        else if (val.length > 20)
            setPasswordError("Maximum 20 characters allowed");
        else setPasswordError(null);
        setPassword(val);
    }

    function handleCPasswordChange(e: ChangeEvent<HTMLInputElement>): void {
        setCPassword(e.target.value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (password !== cpassword) {
                setPasswordError("Passwords do not match");
                return;
            }
            
            setLoading(true);
            // Assuming you have a signupUser function in your UserService
            const response = await UserService.registerUser({ email, password, user_name });
            dispatch(login(response));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert(error);
        }
    }

    return (
        <div className="bg-black h-[80vh] flex items-center justify-center ">
            <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
                <h1 className="text-7xl my-10 text-white font-extrabold">Register</h1>
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
                    <span className={`text-red-400 my-2  ${user_nameError ? 'visible' : 'hidden'} `}>{user_nameError}</span>
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
                        placeholder="name@codezone.com"
                        required
                    />
                    <span className={`text-red-400 my-2  ${emailError ? 'visible' : 'hidden'} `}>{emailError}</span>
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input value={password} onChange={handlePasswordChange} type="password" id="password" className="input" required />
                    <span className={`text-red-400 my-2  ${passwordError ? 'visible' : 'hidden'} `}>{passwordError}</span>
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="cpassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Confirm password
                    </label>
                    <input value={cpassword} onChange={handleCPasswordChange} type="password" id="cpassword" className="input" required />
                </div>
                <button type="submit" className="btn-primary">
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
                <Link className="text-blue-200 my-2 block" to="/signin">
                    Already have an account? Log in
                </Link>
            </form>
        </div>
    );
};

export default SignUp;
