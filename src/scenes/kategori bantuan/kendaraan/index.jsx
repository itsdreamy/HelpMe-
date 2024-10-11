import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS import
import 'datatables.net'; // DataTables JS import
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useStoreProblem } from '../../../api/problemApi';
import { mockDataKendaraan } from "../../../api/mockData";
import { Link } from "react-router-dom";
import Preloader from "../../../components/Preloader"; 

const Kendaraan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { deleteProblem } = useStoreProblem();

  const fetchData = useCallback(async () => {
    try {
      const response = await mockDataKendaraan();
      if (response) {
        const numberedData = response.map((item, index) => ({
          ...item,
          no: index + 1,
          problem_id: item.id, // Adjust according to your data structure
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
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!loading) {
      // Destroy the previous DataTable instance if it exists
      if ($.fn.dataTable.isDataTable('#Kendaraan')) {
        $('#Kendaraan').DataTable().destroy();
      }

      $('#Kendaraan').DataTable({
        data: data,
        columns: [
          { title: "No", data: "no" },
          { title: "Problem ID", data: "problem_id" },
          { title: "Name", data: "name" },
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => {
              return `<button class="delete-button" data-id="${row.id}">Delete</button>`;
            },
          },
        ],
        paging: true,
        searching: true,
        ordering: true,
        responsive: true,
        destroy: true, // Allow the DataTable to be reinitialized
      });

      // Handle delete button clicks after DataTable has been initialized
      $('#Kendaraan tbody').on('click', '.delete-button', function() {
        const id = $(this).data('id'); // Get ID from data-id attribute
        setSelectedId(id); // Save the ID to delete
        setOpenDialog(true); // Show confirmation dialog
      });
    }
  }, [loading, data]);

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

  return (
    <Box m="27px 20px 20px 20px">
      <Header title="Kendaraan" subtitle="Sub Category dari Kendaraan" />
      <Box className="btn-create">
        <Link to="/kendaraan/create" className="create-problem">
          Create New Problem
        </Link>
      </Box>

      {loading ? (
        <Preloader loading={loading} /> // Show preloader while loading or deleting
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box m="35px 0 0 0" height="73vh">
          <table id="Kendaraan" className="display" style={{ width: '100%' }}>
            <thead style={{ backgroundColor: colors.primary[400]}}>
              <tr>
                <th>No</th>
                <th>Problem ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
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

      {/* Add Data */}
      
    </Box>
  );
};

export default Kendaraan;
