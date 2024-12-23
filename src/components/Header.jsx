import React, { useEffect, useState } from 'react';
import { aboutMe } from '../api/authApi';
import Preloader from './Preloader'; // Adjust the import path as necessary

export default function Header() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true); // Set loading to true before fetching
      const data = await aboutMe(); // Fetch user data
      if (data && data.user) {
        console.log(data.user);
        setUsername(data.user.username); // Set username
        setProfile(data.user.image_profile); // Set profile image
      }
      setIsLoading(false); // Set loading to false after fetching
    };

    fetchUserData();
  }, []);

  return (
    <div className='bg-white h-16 px-4 flex justify-end items-center border-b border-gray-200'>
      <div className='flex items-center gap-2 mr-2'>
        {isLoading ? ( // Show Preloader while loading
          <Preloader />
        ) : (
          <>
            <p>{username}</p>
            <img
              src={profile}
              alt="profile-user"
              width={"20px"}
              height={"20px"}
              className='w-9 h-9 rounded-full'
            />
          </>
        )}
      </div>
    </div>
  );
}
