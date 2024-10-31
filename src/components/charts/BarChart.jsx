import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Legend } from 'recharts';
import { CircularProgress } from '@mui/material'; // Import from MUI
import { fetchUserStatsByGranularity } from '../../api/mockData'; // Update this path as necessary

const BarChartUsers = () => {
  const [data, setData] = useState([]);
  const [granularity, setGranularity] = useState("yearly");
  const [year, setYear] = useState("");
  const [startYear, setStartYear] = useState("2011");
  const [endYear, setEndYear] = useState("2024");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      let response = null;

      if (granularity === "monthly" && year) {
        response = await fetchUserStatsByGranularity(granularity, year);
      } else if (granularity === "yearly" && startYear && endYear) {
        response = await fetchUserStatsByGranularity(granularity, null, startYear, endYear);
      }

      if (response && response.data) {
        setData(response.data);
      }
      setIsLoading(false);
    };
    loadData();
  }, [granularity, year, startYear, endYear]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-3 flex items-center space-x-4 bg-gray-50 p-2 rounded-lg">
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700 mr-2">Granularity:</label>
          <select
            className="p-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={granularity}
            onChange={(e) => setGranularity(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {granularity === "monthly" && (
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-2">Year:</label>
            <input
              className="p-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
            />
          </div>
        )}

        {granularity === "yearly" && (
          <>
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">Start Year:</label>
              <input
                className="p-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="Start Year"
              />
            </div>
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">End Year:</label>
              <input
                className="p-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                placeholder="End Year"
              />
            </div>
          </>
        )}
      </form>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
        ) : data.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#333', marginTop: '120px' }}>
            No data available
          </div>
      ) : (
        <ResponsiveContainer width="100%" height={230}> {/* Reduce height here */}
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: -3 }}> {/* Adjust margins */}
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#B5C18E">
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChartUsers;
