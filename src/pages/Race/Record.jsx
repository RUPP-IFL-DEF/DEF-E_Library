import React, { useState, useEffect } from 'react';
import Header from '../../components/section/Header';
import axios from 'axios';
import './race.css';

const API_BASE = 'https://def-e-library-server.onrender.com';

const Record = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch borrow records for the current user
    axios.get(`${API_BASE}/api/borrow-records`)  // Adjust endpoint as needed
      .then(res => {
        setRecords(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch borrow records:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="pt-24 px-4 max-w-screen-xl mx-auto">Loading records...</div>;
  }

  return (
    <>
      <Header />
      <main className="pt-24 px-4 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Borrow Records</h1>

        {records.length === 0 ? (
          <p>No borrow records found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {records.map((record) => {
              const book = record.book || {}; // assuming record has a book field

              return (
                <div
                  key={record._id}
                  className="bg-white border rounded shadow p-4"
                >
                  <img
                    src={book.images && book.images.length > 0 ? book.images[0] : ''}
                    alt={book.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <p className="text-xs text-gray-500">ID: {book._id || book.barCode || 'N/A'}</p>
                  <h3 className="font-semibold text-lg">{book.name || 'Unknown Book'}</h3>
                  <p className="mt-1 text-sm font-medium text-indigo-600">
                    Status: {record.status || 'Pending'}
                  </p>
                  {/* Optionally, show borrow date, return date, etc. */}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
};

export default Record;
