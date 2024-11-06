import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgress } from '@mui/material';
import { orderStats } from '../../api/mockData';

const OrderChart = ({ isDashboard = false }) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);
  const [granularity, setGranularity] = useState("yearly");
  const [date, setDate] = useState('2024-10-07');
  const [startDate, setStartDate] = useState('2024-09-07');
  const [endDate, setEndDate] = useState('2024-11-07');
  const [year, setYear] = useState("2024");
  const [startYear, setStartYear] = useState("2011");
  const [endYear, setEndYear] = useState("2024");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      let response = null;

      // Fetch data based on granularity
      if (granularity === 'hourly') {
        response = await orderStats(status, granularity, date);
      } else if (granularity === 'daily') {
        response = await orderStats(status, granularity, null, startDate, endDate);
      } else if (granularity === "monthly" && year) {
        response = await orderStats(status, granularity, null, null, year);
      } else if (granularity === "yearly" && startYear && endYear) {
        response = await orderStats(
          status,
          granularity,
          null,
          null,
          null,
          null,
          startYear,
          endYear
        );
      }

      if (Array.isArray(response)) {
        setData(response);
      } else {
        setData([]); // Set to empty array if response is not an array
      }
      setIsLoading(false);
    };
    loadData();
  }, [granularity, date, startDate, endDate, year, startYear, endYear]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formattedData = data.map((d) => ({
    ...d,
    period: String(d.period), // Convert period to string
  }));

  return (
    <>
      <form onSubmit={handleSubmit} className="form-filter mb-4 p-2">
        <label className="label-filter mr-4">
          Granularity:
          <select
            className="input-filter ml-2 p-1 border rounded"
            value={granularity}
            onChange={(e) => setGranularity(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>

        {granularity === "monthly" && (
          <label className="label-filter mr-4">
            Year:
            <input
              className="input-filter ml-2 p-1 border rounded"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
            />
          </label>
        )}

        {granularity === "yearly" && (
          <>
            <label className="label-filter mr-4">
              Start Year:
              <input
                className="input-filter ml-2 p-1 border rounded"
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="Enter start year"
              />
            </label>
            <label className="label-filter">
              End Year:
              <input
                className="input-filter ml-2 p-1 border rounded"
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                placeholder="Enter end year"
              />
            </label>
          </>
        )}
      </form>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '120px' }}>
          <CircularProgress />
        </div>
        ) : data.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#333', marginTop: '120px' }}>
            No data available
          </div>
      ) : (
        <ResponsiveContainer width="100%" height={210}>
          <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <XAxis 
              dataKey="period" 
              tick={{ fill: "#333" }} 
              label={{ value: "Year", position: "insideBottomRight", offset: -10, fill: "#333" }} 
            />
            <YAxis 
              tick={{ fill: "#333" }} 
              label={{ value: "Order Count", angle: -90, position: "insideLeft", fill: "#333" }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#f4f4f4', color: '#333' }} 
              formatter={(value) => [`${value} orders`, 'Count']}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ color: '#55679C' }}
              align="right"
            />
            <Bar dataKey="count" fill="#55679C" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default OrderChart;
