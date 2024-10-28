// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import SadPic from '../assets/sad.png'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-50 text-gray-800 p-4">
      <h1 className="text-6xl font-bold text-neutral-500">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Oops! Page not found</h2>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you were looking for doesn’t exist.
      </p>
      <Link to="/dashboard" className="px-6 py-3 bg-neutral-500 text-white rounded-full shadow-md hover:bg-neutral-600 transition">
        Go Home
      </Link>
      <div className="mt-8">
        <img
          src={SadPic}
          alt="Sad Ahh Pic"
          className="rounded-full border-4 border-neutral-300 shadow-lg"
        />
      </div>
    </div>
  );
};

export default NotFound;
