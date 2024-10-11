import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { CircularProgress } from "@mui/material";
import { fetchClientAndMitraStats } from "../api/mockData";

const PieChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const stats = await fetchClientAndMitraStats();
      if (stats) {
        setData([
          {
            id: "Client",
            label: "Client",
            value: stats.client_count,
            color: "white",
          },
          {
            id: "Mitra",
            label: "Mitra",
            value: stats.mitra_count,
            color: "hsl(162, 70%, 50%)",
          },
        ]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <CircularProgress sx={{ color: "#fff" }} />
        </div>
      ) : (
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#fff"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLinkLabel={d => `${d.value}`} // Show the count as arc link labels
          enableArcLabels={false}  // Disable labels inside the pie
          tooltip={() => null}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#fff",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
            },
          ]}
        />
      )}
    </>
  );
};

export default PieChart;
