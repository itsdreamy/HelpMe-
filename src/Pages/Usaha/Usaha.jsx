import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { mockDataMitra } from '../../api/mockData';
import Preloader from "../../components/Preloader";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function Usaha() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [verifiedRows, setVerifiedRows] = useState({}); // Track verification status

  // Fetch Data from API
  const fetchData = useCallback(async () => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
  
    try {
      const response = await mockDataMitra();
  
      // Log the raw response for debugging
      console.log('API Response:', response);
  
      // Check if the response is valid and contains data
      if (response && response.status === 200) {
        const { data } = response; // Destructure the data directly from response
  
        if (Array.isArray(data)) {
          const numberedData = data.map((item, index) => ({
            ...item,
            no: index + 1, // Add numbering
          }));
          setData(numberedData);
        } else {
          console.error("Error: Response data is not an array.");
          setError("Response data is not an array."); // Handle unexpected data type
        }
      } else {
        console.error(`Error: Received status ${response.status}`);
        setError(`Received status ${response.status}`); // Handle non-200 responses
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "An unexpected error occurred."); // Set a user-friendly error message
    } finally {
      setLoading(false); // Stop loading
    }
  }, []);
          
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!loading) {
      if ($.fn.dataTable.isDataTable('#Usaha')) {
        $('#Usaha').DataTable().destroy();
      }

      $('#Usaha').DataTable({
        data: data,
        columns: [
          { title: "No", data: "no" },
          { title: "Mitra ID", data: "id" },
          { title: "Owner Identifier", data: "owner_identifier" },
          { title: "Name", data: "name" },
          { title: "Saldo", data: "saldo" },
          { title: "Latitude", data: "latitude" },
          { title: "Longitude", data: "longitude" },
          { title: "Kategori", data: "category" },
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => {
              const isVerified = verifiedRows[row.id];
              return `
                <button 
                  class="bg-green-500 text-white px-2 py-1 rounded verifikasi-btn" 
                  data-id="${row.id}" 
                  ${isVerified ? 'disabled' : ''}
                >
                  Verifikasi
                </button>
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

      $('#Usaha').on('click', '.verifikasi-button', function () {
        const rowId = $(this).data('id');
        setVerifiedRows((prev) => ({ ...prev, [rowId]: true }));
      });

      $('#Usaha tbody').on('click', '.delete-button', function() {
        const id = $(this).data('id');
        setSelectedId(id);
        setOpenDialog(true);
      });
    }
  }, [loading, data, verifiedRows]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Kelola Usaha Mitra</h2>

      {loading ? (
        <Preloader loading={loading} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table id="Usaha" className="min-w-full table-auto display compact stripe hover">
            <thead className="bg-gray-200">
              <tr>
                <th>No</th>
                <th>Mitra ID</th>
                <th>Owner Identifier</th>
                <th>Name</th>
                <th>Saldo</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Kategori</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      )}

      {/* Confirmation Dialog */}
    </div>
  );
}
