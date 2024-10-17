import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // For the success icon
import cutie from '../../assets/cutie.png'
export default function SuccessPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#f0faff]">
      {/* Success Icon */}
      <div className="mb-8 flex flex-col items-center">
        <FaCheckCircle className="text-green-500 text-7xl" />
        <h1 className="text-4xl font-bold text-[#333] mt-4">Success!</h1>
        <p className="text-lg text-[#666] mt-2">Your operation was successful!</p>
      </div>

      {/* Cute Decoration (Optional) */}
      <div className="w-full flex justify-center">
        <img
          src={cutie} // Replace with your cute image URL
          alt="Cute Success Decoration"
          className="w-60 h-60 object-contain opacity-50"
        />
      </div>
    </div>
  );
}
