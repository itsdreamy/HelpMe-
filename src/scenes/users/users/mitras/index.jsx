import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import { mockDataUsers } from "../../../../api/mockData";
import Header from "../../../../components/Header";
import { useEffect, useState } from "react";
import Preloader from "../../../../components/Preloader"; // Import Preloader
import { toggleStatusUser } from "../../../../api/adminApi";

const Mitras = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State for initial data loading
  const [actionLoading, setActionLoading] = useState(false); // State for ban/unban action
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mockDataUsers('mitra');
        if (response) {
          // Tambahkan properti `no` untuk nomor urut
          const numberedData = response.data.map((item, index) => ({
            ...item,
            no: index + 1, // Menambahkan nomor urut (index dimulai dari 0, jadi +1)
          }));
          console.log("Data Users :", numberedData); // Update log untuk melihat data yang sudah bernomor urut
          setData(numberedData);
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError("Failed to fetch users data");
      } finally {
        setLoading(false); // Stop initial loading
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (id) => {
    setActionLoading(true); // Start action loading
    try {
      const response = await toggleStatusUser(id);
      if (response && response.status === 200) {
        // Update status in UI after success
        setData(
          data.map((user) =>
            user.id === id ? { ...user, is_active: !user.is_active } : user
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle user status:", err);
    } finally {
      setActionLoading(false); // Stop action loading
    }
  };

  const columns = [
    { field: 'no', headerName: 'No', flex: 0.5 }, // Kolom nomor urut
    { field: "id", headerName: "User ID", flex: 1, type: "number" },
    {
      field: "identifier",
      headerName: "Identifier",
      flex: 1,
    },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "is_active",
      headerName: "Is Active",
      flex: 1,
      valueFormatter: (params) => {
        return params === 1 ? "Active" : "Inactive";
      },
    },
    {
      field: "actions",
      headerName: "Ban",
      flex: 1,
      renderCell: (params) => {
        return (
          <button
            onClick={() => handleSubmit(params.row.id)} // Call handleSubmit with user id
            style={{
              backgroundColor: params.row.is_active ? "red" : "green",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {params.row.is_active ? "Ban" : "Unban"}
          </button>
        );
      },
    },
  ];

  if (loading || actionLoading) {
    return <Preloader loading={loading || actionLoading} />; // Show Preloader if loading data or during action
  }

  if (error) {
    return (
      <Box m="20px">
        <Header title="Error" subtitle="Failed to load user data" />
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="27px 0 0 20px">
      <Header title="Mitra" subtitle="Kelola Mitra" />
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
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Mitras;
