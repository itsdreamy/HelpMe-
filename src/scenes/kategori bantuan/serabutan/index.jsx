import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataSerabutan } from "../../../api/mockData";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import Preloader from "../../../components/Preloader"; // Import your Preloader component

const Serabutan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await mockDataSerabutan();
        if (response && response.data) {
          setData(response.data);
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchApi();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <Box mt="4px" ml="20px">
      <Header title="Serabutan" subtitle="Sub Category dari Serabutan" />
      {/* <a href="/serabutan/create">Create New Problem</a> */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Serabutan;
