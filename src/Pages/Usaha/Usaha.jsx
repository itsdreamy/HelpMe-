import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // Import DataTables styling

export default function Usaha() {
  useEffect(() => {
    // Initialize DataTable when component mounts
    $(document).ready(function () {
      $('#usahaTable').DataTable();
    });
  }, []);

  // Example data for the DataTable
  const data = [
    { id: 1, name: 'Business 1', type: 'Retail', location: 'City A' },
    { id: 2, name: 'Business 2', type: 'Service', location: 'City B' },
    { id: 3, name: 'Business 3', type: 'Manufacturing', location: 'City C' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Usaha</h2>
      <div className="overflow-x-auto">
        <table id="usahaTable" className="min-w-full table-auto display compact stripe hover">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Business Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((business) => (
              <tr key={business.id} className="bg-white border-b">
                <td className="px-4 py-2">{business.id}</td>
                <td className="px-4 py-2">{business.name}</td>
                <td className="px-4 py-2">{business.type}</td>
                <td className="px-4 py-2">{business.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
