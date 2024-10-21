import React, { useEffect, useState } from 'react';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_USAHA, DASHBOARD_USERS, DASHBOARD_BANTUAN } from '../lib/consts/navigation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { BsHouseExclamation } from "react-icons/bs";
import { IoCarSportOutline } from "react-icons/io5";
import { MdOutlineElectricalServices } from "react-icons/md";
import { listCategory } from "../api/mockData";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { logout } from "../api/authApi";
import Preloader from './Preloader'; // Import your Preloader component

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-300 hover:no-underline active:bg-neutral-400 rounded-sm text-base';

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [categories, setCategories] = useState([]); 
  const [selected, setSelected] = useState(''); 
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [collapsedState, setCollapsedState] = useState(isCollapsed);

  const categoryIcons = [
    <LiaHandsHelpingSolid />,
    <IoCarSportOutline />,
    <BsHouseExclamation />,
    <MdOutlineElectricalServices />
  ];

  const fetchCategoryList = async () => {
    const data = await listCategory();
    if (data && data.data) {
      setCategories(data.data);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchCategoryList();
    };
    loadData();
  }, []);

  // Handle logout action
  const handleLogout = async () => {
    console.log("Logging out..."); // Log the start of the logout process
    setLogoutLoading(true);

    try {
        const data = await logout(); // Call the logout function
        console.log("Logout response:", data); // Log the response from the logout function

        if (data) {
            console.log("Logout successful, navigating to login..."); // Log success
            navigate("/login"); // Navigate to the login page
        } else {
            console.error("Logout failed: No response data."); // Log if no response data
        }
    } catch (error) {
        console.error("Logout error:", error); // Log any errors that occur during the logout process
    } finally {
        setLogoutLoading(false); // Stop loading state regardless of the outcome
    }
};


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setCollapsedState(true);
      } else {
        setIsMobile(false);
        setCollapsedState(isCollapsed);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed]);

  const handleToggleSidebar = () => {
    setCollapsedState(!collapsedState);
  };

  
  return (
    <div
      className={classNames(
        'bg-white transition-all duration-300 ease-out border border-gray-200 flex flex-col overflow-hidden',
        collapsedState ? 'w-12 opacity-80' : 'w-60 opacity-100'
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-3 py-3">
        {!collapsedState && !isMobile && (
          <div className="flex items-center gap-2">
            <span className='text-lg'>HelpMe! Dashboard</span>
          </div>
        )}
        <button
          className="text-xl p-1 hover:bg-neutral-300 rounded-full"
          onClick={handleToggleSidebar}
        >
          {collapsedState ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Sidebar Links */}
      <div className="py-2 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} isCollapsed={collapsedState} />
        ))}
      </div>

      {/* Kelola Usaha Section */}
      <div className="py-2 flex flex-col gap-0.5">
        {!collapsedState && <p className="px-3 pb-2 font-medium">Kelola Usaha</p>}
        {DASHBOARD_USAHA.map((item) => (
          <SidebarLink key={item.key} item={item} isCollapsed={collapsedState} />
        ))}
      </div>

      {/* Kelola Users Section */}
      <div className="py-2 flex flex-col gap-0.5">
        {!collapsedState && <p className="px-3 pb-2 font-medium">Kelola Pengguna</p>}
        {DASHBOARD_USERS.map((item) => (
          <SidebarLink key={item.key} item={item} isCollapsed={collapsedState} />
        ))}
      </div>

      {/* Kelola Bantuan Section */}
      <div className="py-2 flex flex-col gap-0.5">
        {!collapsedState && <p className="px-3 pb-2 font-medium">Kelola Bantuan</p>}
        {DASHBOARD_BANTUAN.map((item) => (
          <SidebarLink key={item.key} item={item} isCollapsed={collapsedState} />
        ))}
      </div>

      {/* Kategori Bantuan Section */}
      <div className="py-2 flex flex-col gap-0.5">
        {!collapsedState && <p className="px-3 pb-2 font-medium">Kategori Bantuan</p>}
        {categories
          .filter(category => category.id) // Ensure there's a valid id
          .map((category, index) => (
            <SidebarLink
              key={category.id}
              item={{
                path: `/${category.name.toLowerCase()}`,
                label: `Bantuan ${category.name}`,
                icon: categoryIcons[index % categoryIcons.length]
              }}
              isCollapsed={collapsedState}
            />
          ))}
      </div>

      {/* Logout Section */}
      <div className="py-2 flex flex-col gap-0.5">
        {!collapsedState && <p className="px-3 pb-2 font-medium">Logout</p>}
          <div className={classNames('cursor-pointer',linkClasses)} onClick={(e) => {
          e.stopPropagation(); // Prevent any parent elements from interfering
          console.log("Logout button clicked!"); // This should show in the console
          handleLogout(); // Call the logout function
          }}>
          <span>
          <HiOutlineLogout />
          </span>{!collapsedState && 'Logout'} 
          </div>
    </div>

      {/* Show Preloader when logging out */}
      {logoutLoading && <Preloader />} {/* Show preloader if logout is in progress */}
    </div>
  );
}

function SidebarLink({ item, isCollapsed }) {
  const { pathname } = useLocation();

  return (
    <Link 
      to={item.path} 
      className={classNames(
        pathname === item.path ? 'bg-neutral-400' : '', 
        linkClasses
      )}
    >
      <span className='text-xl'>{item.icon}</span>
      {!isCollapsed && item.label}
    </Link>
  );
}
