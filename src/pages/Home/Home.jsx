import React, { useState, useEffect } from 'react';
import Header from '../../components/section/Header';
import './Home.css';
import axios from 'axios';

const API_BASE = 'https://def-e-library-server.onrender.com';

const Home = () => {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/api/books`)
      .then(res => setBooks(res.data))
      .catch(err => console.error('Failed to fetch books:', err));
  }, []);

  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );

  const openBorrowModal = (book) => {
    if (book.available) {
      setSelectedBook(book);
      setShowConfirmModal(true);
    }
  };

  const handleConfirmBorrow = async () => {
    try {
      const payload = {
        bookId: selectedBook._id || selectedBook.barCode,
      };

      await axios.post(`${API_BASE}/api/borrow-requests`, payload);

      alert('Borrow request submitted! Await admin approval.');

      setSelectedBook(null);
      setShowConfirmModal(false);
    } catch (error) {
      alert('Failed to submit borrow request.');
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 px-4 max-w-screen-xl mx-auto">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="flex-grow p-2 border rounded shadow-sm"
          />
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book._id || book.barCode}
              className="bg-white border rounded shadow hover:shadow-md transition p-3"
            >
              <img
                src={book.images && book.images.length > 0 ? book.images[0] : ''}
                alt={book.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <p className="text-xs text-gray-500">ID: {book._id || book.barCode}</p>
              <h3 className="font-semibold text-sm">{book.name}</h3>
              <p className="text-xs text-gray-600">{book.shelfLocation}</p>
              <p className={`text-xs font-medium ${book.available ? 'text-green-600' : 'text-red-500'}`}>
                {book.available ? '✅ Available' : '❌ Not Available'}
              </p>
              <button
                onClick={() => openBorrowModal(book)}
                disabled={!book.available}
                className={`mt-2 w-full py-1.5 text-sm rounded font-semibold transition ${
                  book.available
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {book.available ? 'Borrow' : 'Not Available'}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showConfirmModal && selectedBook && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: '24px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Confirm Borrow</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Are you sure you want to borrow <strong>{selectedBook.name}</strong>?
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#ccc',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#aaa')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#ccc')}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBorrow}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2563eb')}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
