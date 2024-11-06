import Sidebar from '../../components/sidebar';
import React, { useState, useEffect } from 'react'; // Import useEffect for responsive behavior
import { Outlet } from 'react-router-dom';
import Header from '../Header';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track sidebar collapse

  // Function to toggle the sidebar collapse manually
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Automatically collapse the sidebar on smaller screens (e.g., mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true); // Collapse sidebar on small screens
      } else {
        setIsCollapsed(false); // Expand sidebar on larger screens
      }
    };

    // Attach resize event listener
    window.addEventListener('resize', handleResize);

    // Run on component mount to check initial window size
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
      {/* Pass state and toggle function */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} /> 
      <div className="flex-1">
        <Header />
        <div className='p-2'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
