import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { listHelpers } from '../../api/categoryApi';
import Preloader from "../../components/Preloader";
import ReactModal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import { storeProblem, deleteProblem } from '../../api/categoryApi';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

ReactModal.setAppElement('#root');

export default function KategoriBantuan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();
  const [helperData, setHelperData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedHelper, setSelectedHelper] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fetchHelperData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await listHelpers(category);
      if (response) {
        console.log({'HELPER': response.data});
        setHelperData(response.data);
      } else {
        console.error("No helper data found");
      }
    } catch (err) {
      console.error("Error fetching helper data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHelperData();
  }, [fetchHelperData]);

  useEffect(() => {
    if (!loading && !error) {
      if ($.fn.dataTable.isDataTable('#Bantuan')) {
        $('#Bantuan').DataTable().destroy();
      }

      $('#Bantuan').DataTable({
        data: data,
        columns: [
          {
            title: "No",
            data: null,
            render: (data, type, row, meta) => meta.row + 1,
          },
          { title: "Problem ID", data: "id" },
          { title: "Name", data: "name" },
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => {
              return `
                <button class="bg-red-500 text-white px-2 py-1 rounded delete-btn" data-id="${row.id}">Delete</button>
              `;
            },
          },
        ],
        paging: true,
        searching: true,
        ordering: true,
        responsive: true,
        destroy: true,
      });

      $('#Bantuan').on('click', '.delete-btn', function () {
        const rowId = $(this).data('id');
        const selectedData = data.find((item) => item.id === rowId);
        setSelectedRow(selectedData);
        setIsDeleteModalOpen(true); // Open the delete confirmation modal
      });
    }
  }, [loading, data, error]);

  const handleDeleteConfirm = async () => {
    if (!selectedRow) return;

    setLoading(true);
    try {
      await deleteProblem(selectedRow.id);
      setData(data.filter((item) => item.id !== selectedRow.id));
      setSnackbarMessage('Problem deleted successfully!');
      setSnackbarSeverity('success');
    } catch (err) {
      console.error("Failed to delete problem:", err);
      setSnackbarMessage('Failed to delete problem!');
      setSnackbarSeverity('error');
    } finally {
      setLoading(false);
    }
    setIsDeleteModalOpen(false); // Close the delete modal
    setSnackbarOpen(true); // Open the Snackbar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setName('');
    setSelectedHelper('');
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newData = await storeProblem(name, selectedHelper);
      if (newData) {
        console.log(newData);
        setSnackbarMessage('Entry added successfully!');
        setSnackbarSeverity('success');
  
        // Update the data state
        setData((prevData) => [...prevData, newData]);
  
        // Refresh the DataTable
        const dataTable = $('#Bantuan').DataTable();
        dataTable.clear().rows.add([...data, newData]).draw(); // Ensure you use the updated data array
      } else {
        throw new Error("No data returned");
      }
    } catch (error) {
      console.error("Failed to add new entry:", error);
      setSnackbarMessage('Failed to add new entry!');
      setSnackbarSeverity('error');
    } finally {
      setIsAddModalOpen(false); // Ensure modal closes regardless of success or failure
      setLoading(false);
      setSnackbarOpen(true); // Open the Snackbar
    }
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{`Kelola Bantuan ${category.charAt(0).toUpperCase() + category.slice(1)}`}</h2>

      <Button variant="contained" color="primary" onClick={() => setIsAddModalOpen(true)} className="mt-4">
        Tambah Masalah
      </Button>

      {loading ? (
        <Preloader />
      ) : error || data.length === 0 ? (
        <div className="text-red-500">{error ? error : 'No data found'}</div>
      ) : (
        <div className="overflow-x-auto">
          <table id="Bantuan" className="min-w-full table-auto display compact stripe hover">
            <thead className="bg-gray-200">
              <tr>
                <th>No</th>
                <th>Problem ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* DataTable will populate rows here */}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation modal */}
      <ReactModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete Confirmation"
        className="w-full max-w-sm mx-auto mt-24 bg-white rounded shadow-lg p-6"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
        <p className="mt-2">Are you sure you want to delete the entry <strong>{selectedRow?.name}</strong>?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDeleteConfirm}
          >
            Confirm
          </button>
        </div>
      </ReactModal>

      {/* Modal Dialog for adding new entry */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <DialogTitle>Add New Problem</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            select
            label="Helper"
            fullWidth
            value={selectedHelper}
            onChange={(e) => setSelectedHelper(e.target.value)}
            margin="normal"
          >
            {helperData.map((helper) => (
              <MenuItem key={helper.id} value={helper.id}>
                {helper.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Set position to top-right
>
  <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
    {snackbarMessage}
  </Alert>
</Snackbar>

    </div>
  );
}
