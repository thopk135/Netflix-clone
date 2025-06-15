import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser.js";
export const SignupPage = () => {

  const searchParam = new URLSearchParams(document.location.search);
  const emailValue = searchParam.get("email");
  const [email,setEmail] = useState(emailValue||"");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const {signup} = useAuthStore();

  const handleSignup = (e) => {
    e.preventDefault();
    signup({email,username,password});
  }

  
  return (
    <div className='h-screen w-full bg-hero'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className='w-52' />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-center text-white text-2xl font-bold mb-4'>
            SignUp
          </h1>
          <form className='space-y-4 fl' onSubmit={handleSignup}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-200 block">Email</label>
              <input type="email" className="w-full px-3 py-2 mt-1 border-gray-800 rounded-md bg-transparent text-white 
              focus:outline-none focus:ring" 
              placeholder="abc@gmail.com"
              id='email'
              value={email}
              onChange = {(e) => setEmail(e.target.value)}/>
            </div>
            {/* Username */}
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-200 block">Username</label>
              <input type="text" className="w-full px-3 py-2 mt-1 border-gray-800 rounded-md bg-transparent text-white 
              focus:outline-none focus:ring" 
              placeholder="Username"
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-200 block">Password</label>
              <input type="text" className="w-full px-3 py-2 mt-1 border-gray-800 rounded-md bg-transparent text-white 
              focus:outline-none focus:ring" 
              placeholder="*********"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </div>
            {/* Button submit */}
            <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Sign Up
            </button>
            {/* Signin */}
            <div className="text-center text-gray-400"> 
              Do you have an account?
              <Link to={"/login"} className="text-red-500 hover:underline"> Login</Link>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}
