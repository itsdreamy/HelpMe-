import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // Import DataTables styling
import { mockDataUsers } from '../../api/mockData'; // API hook for delete action
import Preloader from "../../components/Preloader"; // Preloader component
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function Mitra() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data from API
  const fetchData = useCallback(async () => {
    try {
      const response = await mockDataUsers('mitra');
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
      if ($.fn.dataTable.isDataTable('#Mitra')) {
        $('#Mitra').DataTable().destroy();
      }

      $('#Mitra').DataTable({
        data: data,
        columns: [
          { title: "No", data: "no" },
          { title: "User ID", data: "id" },
          { title: "Identifier", data: "identifier" },
          { title: "Name", data: "full_name" },
          { title: "Nomor Telepon", data: "phone_number" },
          { title: "Username", data: "username" },
          { title: "Role", data: "role" },
          {
            title: "Is Active",
            data: "is_active",
            render: (data, type, row) => {
              return row.is_active ? "Active" : "Inactive";
            },
          },
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => {
              return (
                <button
                  onClick={() => handleSubmit(row.id)} // Call handleSubmit with user id
                  style={{
                    backgroundColor: row.is_active ? "red" : "green",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {row.is_active ? "Ban" : "Unban"}
                </button>
              );
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
      <h2 className="text-2xl font-bold mb-4">Kelol Akun Mitra</h2>

      {loading ? (
        <Preloader loading={loading} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table id="Mitra" className="min-w-full table-auto display compact stripe hover">
            <thead className="bg-gray-200">
              <tr>
                <th>No</th>
                <th>User ID</th>
                <th>Identifier</th>
                <th>Name</th>
                <th>Nomor Telepon</th>
                <th>Username</th>
                <th>Role</th>
                <th>Is Active</th>
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
