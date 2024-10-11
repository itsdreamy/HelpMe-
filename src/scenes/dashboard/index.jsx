import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from '../../components/BarChart'; 
import BarChartOrder from "../../components/bar";
import PieChart from "../../components/PieChart";  
import { fetchClientAndMitraStats } from "../../api/mockData";  
import { useState, useEffect } from "react";  
import Preloader from "../../components/Preloader"; 

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [chartLoading, setChartLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [isCollapsed, setIsCollapsed] = useState(false);

  const dashboardStyle = {
    width: isCollapsed ? "calc(100% - 50px)" : "calc(100% - 37px)", // Adjust based on sidebar size
    marginLeft: isCollapsed ? "20px" : "20px", // Adjust based on sidebar size
    transition: "width 0.3s ease", // Smooth transition when the sidebar is toggled
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response = await fetchClientAndMitraStats();
        console.log('Data: ', response);
        setData(response.all); // Adjust according to your data structure
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error:", err);
      } finally {
        setLoading(false); // Finish loading data regardless of success or failure
      }
    };

    fetchApi();
  }, []);

  return (
    <Box m="27px 20px 20px 20px" style={dashboardStyle}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      
      {/* Top Grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box gridColumn="span 7" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Users
              </Typography>
            </Box>
          </Box>
          <Box height="260px" sx={{ justifyContent: "center" }}>
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 5" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Client VS Mitra
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                Total: {data}
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <PieChart isDashboard={true} data={data} />
          </Box>
        </Box>
      </Box>

      {/* Bottom Grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)" // Match the top grid's column structure
        gridAutoRows="170px"
        marginTop="20px"
      >
        {/* Make the bottom box span all 12 columns */}
        <Box gridColumn="span 12" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Orders
              </Typography>
            </Box>
          </Box>
          <Box height="290px">
            <BarChartOrder isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
