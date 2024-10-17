import React from 'react';
import IMG from "../../assets/login.jpg";
import { Link } from 'react-router-dom';

const colors = {
  primary: "#060606",
  background: "E0E0E0",
  disabled: "#D9D9D9"
};

export default function ForgotPass() {
  return (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      {/* Left image section */}
      <div className="relative w-full md:w-1/2 h-1/3 md:h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col max-w-[550px] p-4 md:p-0">
          <div className="text-3xl md:text-4xl text-white font-extrabold my-4">Can't remember your password?</div>
          <p className='text-lg md:text-xl text-white font-normal'>Don't worry, we'll help you!</p>
        </div>
        <img src={IMG} className="w-full h-full object-cover" />
      </div>

      {/* Right form section */}
      <div className="w-full md:w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-center p-6 md:p-20">
        <h1 className="text-base md:text-lg text-[#060606] font-semibold mb-5">
          "Enter your email first so we can help you change your password!"
        </h1>
        <div className="w-full flex flex-col">
          <div className="flex flex-col mb-10">
            <h3 className='text-2xl md:text-3xl font-semibold mb-2'>Forgot Password</h3>
            <p className='text-base mb-2'>Please enter your details!</p>
          </div>
          <form>
            <div className="w-full flex flex-col">
              <input 
                placeholder='08xxxxxxxxx' 
                type="text" 
                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' 
              />
            </div>

            <div className="w-full flex flex-col my-4">
              <button className="w-full text-white bg-[#0d0d0d] rounded-md p-4 text-center flex items-center justify-center">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
