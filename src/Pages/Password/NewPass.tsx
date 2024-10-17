import React from 'react';
import { Link } from 'react-router-dom';

export default function NewPass() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#f5f5f5] px-4">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white p-6 sm:p-10 shadow-lg rounded-lg flex flex-col">
        <div className="w-full flex flex-col">
          <div className="flex flex-col mb-10 text-center">
            <h3 className='text-2xl sm:text-3xl font-semibold mb-2'>Reset Password</h3>
            <p className='text-base mb-2'>Please enter your new password!</p>
          </div>
          <form>
            <div className="w-full flex flex-col">
              <input
                placeholder='New Password'
                type="password"
                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
              />
            </div>
            <div className="w-full flex flex-col">
              <input
                placeholder='Confirm Password'
                type="password"
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
  )
}
