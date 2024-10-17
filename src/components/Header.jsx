import React, { useEffect, useState } from 'react'
import {BASE_URL} from '../api/api'
import { aboutMe } from '../api/authApi'
export default function Header() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await aboutMe();
      if (data && data.user) {
        setUsername(data.user.username);
        setRole(data.user.role);
        setProfile(BASE_URL + "/" + data.user.image_profile);
      }
    };

    const loadData = async () => {
      await fetchUserData();
    };

    loadData();
  }, []);
  return (
    <div className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200'>
        <div>
            <h1>Dashboard</h1>
        </div>
        <div className='flex items-center gap-2 mr-2'>
        <p>{username}</p>
        <img src="{profile}" alt="" />
        </div>
    </div>
  )
}
