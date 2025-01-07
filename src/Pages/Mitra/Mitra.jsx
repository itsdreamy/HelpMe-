import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { listMitras } from '../../api/mitraApi';
import { verifyMitra } from '../../api/mitraApi';
import Preloader from "../../components/Preloader";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function Mitra() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [verifiedRows, setVerifiedRows] = useState({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await listMitras();
      const numberedData = response.data.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
      setData(numberedData);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleVerification = async (id) => {
    try {
      await verifyMitra(id);
      setVerifiedRows((prev) => ({ ...prev, [id]: true }));
      fetchData(); // Refresh the data after verification
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };
          
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
  if (!loading) {
    // Destroy the previous DataTable instance if it exists
    if ($.fn.dataTable.isDataTable('#Mitra')) {
      $('#Mitra').DataTable().destroy();
    }
    const table = $('#Usaha').DataTable({
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
          render: function(data, type, row) {
            return `
              <button 
                class="bg-green-500 text-white px-2 py-1 rounded verifikasi-btn" 
                data-id="${row.id}" 
                ${verifiedRows[row.id] ? 'disabled' : ''}
              >
                Verifikasi
              </button>
            `;
          }
        }
      ],
      destroy: true
    });

    // Handle verification button click
    $('#Usaha tbody').on('click', '.verifikasi-btn', function() {
      const id = $(this).data('id');
      handleVerification(id);
    });

    return () => {
      table.destroy();
    };
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
