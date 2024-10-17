import React from 'react';
import { FcBullish } from 'react-icons/fc';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../lib/consts/navigation';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Icons for collapse/expand

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-300 hover:no-underline active:bg-neutral-400 rounded-sm text-base';

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  return (
    <div className={classNames(
      'bg-white transition-all duration-300 ease-out border border-gray-200 flex flex-col overflow-hidden', // Changed ease-in-out to ease-out
      isCollapsed ? 'w-12 opacity-80' : 'w-60 opacity-100' // Adjusted width and opacity for collapsed state
    )}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-3 py-3">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className='text-lg'>HelpMe! Dashboard</span>
          </div>
        )}
        {/* Toggle Button */}
        <button
          className="text-xl p-1 hover:bg-neutral-300 rounded-full"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Sidebar Links */}
      <div className="flex-1 py-2 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} isCollapsed={isCollapsed} />
        ))}
      </div>

      {/* Logout Button - Stays at the bottom */}
      <div className='flex-shrink-0 flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
        <div className={classNames('text-red-500', linkClasses)}>
          <span className='text-xl'><HiOutlineLogout /></span>
          {!isCollapsed && 'Logout'} {/* Show label only when not collapsed */}
        </div>
      </div>
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
      {!isCollapsed && item.label} {/* Show label only when not collapsed */}
    </Link>
  );
}
