import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { listCategory } from '../../api/categoryApi'; // API hook for category data
import Preloader from "../../components/Preloader"; // Preloader component
import ReactModal from 'react-modal';
import { storeCategory, deleteCategory } from '../../api/categoryApi';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

ReactModal.setAppElement('#root');

export default function KelolaKategori() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Fetch Data from API
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await listCategory();
            if (response.data) {
                const numberedData = response.data.map((item, index) => ({
                    ...item,
                    no: index + 1,
                }));
                console.log(numberedData);//setData(numberedData);
            } else {
                console.error("No data found");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (!loading && !error) {
            initializeDataTable();
        }
    }, [loading, data, error]);

    const initializeDataTable = () => {
        if ($.fn.dataTable.isDataTable('#KelolaBantuan')) {
            $('#KelolaBantuan').DataTable().destroy();
        }

        $('#KelolaBantuan').DataTable({
            data: data,
            columns: [
                { title: "No", data: "no" },
                { title: "Kategori ID", data: "id" },
                { title: "Nama", data: "name" },
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

        $('#KelolaBantuan').on('click', '.delete-btn', function () {
            const rowId = $(this).data('id');
            const selectedData = data.find((item) => item.id === rowId);
            setSelectedRow(selectedData);
            setIsDeleteModalOpen(true);
        });
    };

    const handleDeleteConfirm = async () => {
        if (!selectedRow) return;

        setLoading(true);
        try {
            await deleteCategory(selectedRow.id);
            setData(data.filter((item) => item.id !== selectedRow.id));
            setSnackbarMessage('Category deleted successfully!');
            setSnackbarSeverity('success');
        } catch (err) {
            console.error("Failed to delete category:", err);
            setSnackbarMessage('Failed to delete category!');
            setSnackbarSeverity('error');
        } finally {
            setLoading(false);
            setIsDeleteModalOpen(false); // Close the delete modal
            setSnackbarOpen(true); // Open the Snackbar
        }
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
        setNewCategoryName('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleCloseAddModal();
        // Implement your add logic here (API call)
        try {
            const newCategory = await storeCategory(newCategoryName); // Replace with your add function
            setData([...data, { id: newCategory.id, name: newCategoryName, no: data.length + 1 }]); // Add new category to state
            setSnackbarMessage('Category added successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error("Failed to add new category:", error);
            setSnackbarMessage('Failed to add new category!');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Kelola Kategori Bantuan</h2>
            <Button variant="contained" color="primary" onClick={handleOpenAddModal} className="mt-4">
                Tambah Kategori
            </Button>

            {loading ? (
                <Preloader />
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table id="KelolaBantuan" className="min-w-full table-auto display compact stripe hover">
                        <thead className="bg-gray-200">
                            <tr>
                                <th>No</th>
                                <th>Kategori ID</th>
                                <th>Nama</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* DataTable will populate rows here */}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Snackbar for notifications */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

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

            {/* Modal Dialog for adding new category */}
            <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Category Name"
                        fullWidth
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
