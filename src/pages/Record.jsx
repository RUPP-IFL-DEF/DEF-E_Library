import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://def-e-library-server.onrender.com';

const Record = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`${API_BASE}/api/records/my`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token, navigate]);

  const handleReturn = async (recordId) => {
    try {
      const res = await fetch(`${API_BASE}/api/records/return/${recordId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setRecords((prev) =>
          prev.map((r) => (r._id === recordId ? { ...r, returned: true } : r))
        );
      }
    } catch (err) {
      console.error('Return error:', err);
    }
  };

  if (loading) return <p>Loading records...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Borrowed & Returned Books</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map((record) => (
            <li key={record._id} style={{ marginBottom: '1rem' }}>
              <strong>{record.bookTitle}</strong> — Borrowed on{' '}
              {new Date(record.borrowedAt).toLocaleDateString()}
              <br />
              {record.returned ? (
                <span style={{ color: 'green' }}>✔️ Returned</span>
              ) : (
                <button onClick={() => handleReturn(record._id)}>Return</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Record;
