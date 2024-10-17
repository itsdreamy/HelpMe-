import React from 'react';
import Sidebar from '../../components/sidebar';

function Dashboard() {
  return (
    <div className='flex flex-col gap-4 bg-neutral-100'>
      {/* First Row: Two containers side by side */}
      <div className="flex gap-4 flex-1">
        <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
          bejierrr
        </div>
        <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
          we
        </div>
      </div>

      {/* Second Row: The bottom container */}
      <div className="bg-white rounded-sm p-4 border border-gray-200 flex items-center flex-1">
        This is the bottom container
      </div>
    </div>
  );
}

export default Dashboard;
