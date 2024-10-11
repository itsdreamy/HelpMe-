import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { mockDataMitra } from "../../api/mockData";
import { useEffect, useState } from "react";
import Preloader from "../../components/Preloader"; // Import your Preloader component

const Usaha = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]); // State for storing data
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const response = await mockDataMitra(); // Fetch data
      if (response) {
        // Tambahkan properti `no` untuk nomor urut
        const numberedData = response.data.map((item, index) => ({
          ...item,
          no: index + 1, // Menambahkan nomor urut (index dimulai dari 0, jadi +1)
        }));
        console.log("Data Users :", numberedData); // Update log untuk melihat data yang sudah bernomor urut
        setData(numberedData);
      } else {
        console.log("No data found");
      }
      setLoading(false); // Stop loading after data is fetched
    };
    fetchData(); // Fetch the data
  }, []);

  const columns = [
    { field: "no", headerName: "No", flex: 0.5 }, // Kolom nomor urut
    { field: "id", headerName: "Mitra ID", flex: 1, type: "number" },
    {
      field: "owner_identifier",
      headerName: "Owner Identifier",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "saldo",
      headerName: "Saldo",
      flex: 1,
      type: "number",
    },
    {
      field: "latitude",
      headerName: "Latitude",
      flex: 1,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
  ];

  return (
    <Box m="27px 0 0 20px">
      {loading && <Preloader loading={loading} />}{" "}
      {/* Show Preloader if loading */}
      <Header title="Usaha Mitra" subtitle="List Usaha Mitra" />
      <Box
        m="20px 0 0 0"
        height="77vh"
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
        {!loading && <DataGrid rows={data} columns={columns} />}{" "}
        {/* Show DataGrid if not loading */}
      </Box>
    </Box>
  );
};

export default Usaha;
