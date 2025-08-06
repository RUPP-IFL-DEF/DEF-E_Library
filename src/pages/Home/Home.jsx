import React, { useState } from 'react';
import Header from '../../components/section/Header';
import './Home.css';

const booksData = [
  {
    barCode: 'BK-0001',
    name: 'The Silent Forest',
    shelfLocation: 'A1',
    available: true,
    borrowedBy: 'N/A',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'],
  },
  // Add more books here as per the updated data structure
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowForm, setBorrowForm] = useState({ name: '', phone: '' });

  const filteredBooks = booksData.filter((book) => {
    const matchSearch = book.name.toLowerCase().includes(search.toLowerCase());
    return matchSearch; // Only search by book name
  });

  const handleBorrow = () => {
    alert(`Borrowed: ${selectedBook.name}\nID: ${selectedBook.barCode}\nBy: ${borrowForm.name} (${borrowForm.phone})`);
    setSelectedBook(null);
    setBorrowForm({ name: '', phone: '' });
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
            <div key={book.barCode} className="bg-white border rounded shadow hover:shadow-md transition p-3">
              <img src={book.images[0]} alt={book.name} className="w-full h-48 object-cover rounded mb-2" />
              <p className="text-xs text-gray-500">ID: {book.barCode}</p>
              <h3 className="font-semibold text-sm">{book.name}</h3>
              <p className="text-xs text-gray-600">{book.shelfLocation}</p>
              <p className="text-xs italic text-gray-500">{book.available ? 'Available' : 'Not Available'}</p>
              <button
                onClick={() => setSelectedBook(book)}
                className="mt-2 w-full py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Borrow
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Borrow Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-lg font-bold mb-2">Borrow Book</h2>
            <p className="text-sm mb-4">Book: <strong>{selectedBook.name}</strong> (ID: {selectedBook.barCode})</p>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={borrowForm.name}
              onChange={(e) => setBorrowForm({ ...borrowForm, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={borrowForm.phone}
              onChange={(e) => setBorrowForm({ ...borrowForm, phone: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setSelectedBook(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleBorrow}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
