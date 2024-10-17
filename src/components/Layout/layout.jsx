import Sidebar from '../../components/sidebar';
import React, { useState } from 'react'; // Import useState hook
import { Outlet } from 'react-router-dom';
import Header from '../header';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track sidebar collapse

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle the sidebar state
  };

  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} /> {/* Pass state and toggle function */}
      <div className="flex-1">
        <Header />
        <div className='p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
