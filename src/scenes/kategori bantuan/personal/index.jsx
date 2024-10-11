import React, { useState } from 'react';
import { Box, Typography, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useStoreProblem } from '../../../api/problemApi'; // Import the custom hook
import { mockDataPersonal } from "../../../api/mockData";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Preloader from "../../../components/Preloader"; // Import Preloader component

const Personal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { deleteProblem } = useStoreProblem();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await mockDataPersonal();
        if (response) {
          const numberedData = response.map((item, index) => ({
            ...item,
            no: index + 1,
          }));
          setData(numberedData);
        } else {
          console.error("No data found");
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id); // Save the ID to delete
    setOpenDialog(true); // Show confirmation dialog
  };

  const handleConfirmDelete = async () => {
    setOpenDialog(false); // Close the dialog immediately after clicking delete
    setLoading(true); // Show the preloader while deleting
    try {
      await deleteProblem(selectedId); // Delete the problem
      setData(data.filter((item) => item.id !== selectedId)); // Remove the item from state
    } catch (err) {
      console.error("Failed to delete problem:", err);
    } finally {
      setLoading(false); // Hide the preloader after deletion
    }
  };

  const columns = [
    { field: 'no', headerName: 'No', flex: 0.5 },
    { field: "id", headerName: "Problem ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteClick(params.row.id)} // Trigger delete confirmation
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="27px 20px 20px 20px">
      <Header title="Personal" subtitle="Sub Category dari Personal" />
      <Box className="btn-create">
        <Link to="/personal/create" className="create-problem">
          Create New Problem
        </Link>
      </Box>

      {loading ? (
        <Preloader loading={loading} /> // Show preloader while loading or deleting
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          m="9px 0 0 0"
          height="73vh"
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
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this problem?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: "white", backgroundColor: "transparent" }} // White text with transparent background
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Personal;
