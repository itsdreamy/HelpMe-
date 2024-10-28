import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // Import DataTables styling
import { listCategory } from '../../api/mockData'; // API hook for delete action
import Preloader from "../../components/Preloader"; // Preloader component
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function KelolaBantuan() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch Data from API
    const fetchData = useCallback(async () => {
      try {
        const response = await listCategory();
        if (response && response.data) {
          const numberedData = response.data.map((item, index) => ({
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
    }, []);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    useEffect(() => {   
      if (!loading) {
        // Destroy the previous DataTable instance if it exists
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
          destroy: true, // Allow the DataTable to be reinitialized
        });
      }
    }, [loading, data]);
  
    const handleSubmit = async (id) => {
      // Implement your ban/unban logic here
      console.log("Toggle user status for ID:", id);
    };
  
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Kelola Kategori Bantuan</h2>
        
        {/* New Button below the title */}
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded mb-6 hover:bg-blue-600 transition"
          onClick={() => console.log('Add new category clicked')}
        >
          Create New Category
        </button>
        
        {loading ? (
          <Preloader loading={loading} />
        ) : error ? (
          <div>{error}</div>
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
      </div>
    );
}
