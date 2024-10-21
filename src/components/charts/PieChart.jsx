import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CircularProgress } from "@mui/material";
import { fetchClientAndMitraStats } from "../../api/mockData";

const PieChartDiff = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const stats = await fetchClientAndMitraStats();
      if (stats) {
        setData([
          {
            name: "Client",
            value: stats.client_count,
            color: "#543310", // Client color
          },
          {
            name: "Mitra",
            value: stats.mitra_count,
            color: "#AF8F6F", // Mitra color
          },
        ]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center m-0 p-0"> {/* Adjust margin and padding */}
      {isLoading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <PieChart width={400} height={400} margin={{ top: -65, right: 0, left: 0, bottom: 0 }}> {/* Ensure no margin on PieChart */}
          <Pie
            data={data}
            cx={200} // Center x
            cy={200} // Center y
            innerRadius={60} // Inner radius for a donut chart
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Show percentage label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={30}
            iconType="circle"
            wrapperStyle={{ marginBottom: "70px", color: '#fff' }} // Adjust padding as needed
          />
        </PieChart>
      )}
    </div>
  );
};

export default PieChartDiff;
