import React from 'react';
import BarChartUsers from '../../components/charts/BarChart';
import PieChartDiff from '../../components/charts/PieChart';
import OrderChart from '../../components/charts/OrderChart';

function Dashboard() {
  return (
    <div className='flex flex-col gap-2 bg-neutral-100 h-screen'>
      {/* First Row: Two containers side by side */}
      <div className="flex gap-4 flex-1 h-1/2">
        {/* First container with title and BarChartUsers */}
        <div className="bg-white rounded-sm p-0 flex-1 border border-gray-200 flex flex-col h-full">
          <h2 className="text-center text-xl font-semibold p-2">Users Data</h2> {/* Title for BarChartUsers */}
          <div className="flex justify-center items-center flex-grow">
            <BarChartUsers />
          </div>
        </div>

        {/* Second container with title and PieChartDiff */}
        <div className="bg-white rounded-sm p-0 flex-1 border border-gray-200 flex flex-col h-full">
          <h2 className="text-center text-xl font-semibold p-2">Mitra VS Client</h2> {/* Title for PieChartDiff */}
          <div className="flex justify-center items-center flex-grow">
            <PieChartDiff />
          </div>
        </div>
      </div>

      {/* Second Row: The bottom container with OrderChart */}
      <div className="bg-white rounded-sm border border-gray-200 flex flex-col h-3/4 p-2">
        <h2 className="text-center text-xl font-semibold p-2">Order Statistics</h2> {/* Title for OrderChart */}
        <OrderChart />
      </div>
    </div>
  );
}

export default Dashboard;
