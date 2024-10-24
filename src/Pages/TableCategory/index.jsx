import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // Import DataTables styling
import 'datatables.net';
import React, { useEffect, useState, useCallback } from 'react';
import { useStoreProblem } from '../../api/problemApi';
import Preloader from '../../components/Preloader'; // Preloader component
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { mockDataCategory } from '../../api/mockData';
import { useParams } from 'react-router-dom';

export default function TableCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { deleteProblem } = useStoreProblem(); // API for delete action
  const { category } = useParams();

  // Fetch Data from API
  const fetchData = useCallback(async () => {
    try {
        const response = await mockDataCategory(category);
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

  // Initialize and Reinitialize DataTable after data is loaded
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!loading) {
      // Destroy the previous DataTable instance if it exists
      if ($.fn.dataTable.isDataTable('#' + category)) {
        $('#' + category).DataTable().destroy();
      }

      $('#' + category).DataTable({
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
      $(`#${category} tbody`).on('click', '.delete-button', function() {
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{category}</h2>

      {loading ? (
        <Preloader loading={loading} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table id={category.charAt(0).toUpperCase() + category.slice(1)} className="min-w-full table-auto display compact stripe hover">
            <thead className="bg-gray-200">
              <tr>
                <th>No</th>
                <th>Problem ID</th>
                <th>Name</th>
                <th>Actons</th>
              </tr>
            </thead>
          </table>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this business?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
