import React, { useState } from 'react';
import IMG from "../../assets/login.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import Preloader from '../../components/Preloader'; // Import the Preloader component

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const data = await login(username, password);
      console.log(data);
      
      if (data && data.token) {
        navigate('/dashboard');
      } else {
        setErrorMessage('Login failed! Username or password is incorrect.');
      }
    } catch (error) {
      setErrorMessage('An error occurred! Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row relative">
      {isLoading && <Preloader />} {/* Render Preloader if loading */}

      {/* Left Image Section */}
      <div className="relative w-full md:w-1/2 h-[40vh] md:h-full flex flex-col">
        <div className="absolute top-[20%] left-[5%] md:left-[10%] flex flex-col max-w-[550px] p-4 md:p-0">
          <div className="text-2xl md:text-4xl text-white font-extrabold my-2 md:my-4">Welcome to HelpMe! Dashboard!</div>
          <p className="text-lg md:text-xl text-white font-normal">The place where you can manage your HelpMe! App</p>
        </div>
        <img src={IMG} className="w-full h-full object-cover" alt="Login Background" />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-center p-8 md:p-20">
        <h1 className="text-sm md:text-base text-[#060606] font-semibold mb-4 md:mb-5">
          "Welcome back! Let's verify who you are!"
        </h1>
        <div className="w-full flex flex-col">
          <div className="flex flex-col mb-6 md:mb-10">
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">Login</h3>
            <p className="text-sm md:text-base mb-2">Please enter your details!</p>
            {errorMessage && (
              <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <input
                placeholder="Username"
                type="text"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="w-full flex flex-col">
              <input
                placeholder="Password"
                type="password"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="w-full flex items-end justify-end">
              <Link to={"/forgotpassword"}>
                <p className="text-xs md:text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                  Forgot Password?
                </p>
              </Link>
            </div>

            <div className="w-full flex flex-col my-4">
              <button 
                type="submit"
                className={`w-full text-white bg-[#0d0d0d] rounded-md p-3 md:p-4 text-center flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
