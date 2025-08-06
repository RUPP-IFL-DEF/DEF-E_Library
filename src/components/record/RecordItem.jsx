// src/components/RecordItem.jsx

import React from 'react';

const RecordItem = ({ record, onReturn }) => {
  const { bookTitle, borrowedAt, returnedAt, status, _id } = record;

  return (
    <div className="record-item">
      <h4>{bookTitle}</h4>
      <p>Borrowed At: {new Date(borrowedAt).toLocaleDateString()}</p>
      <p>
        Status: {status === 'returned' ? 'Returned' : 'Borrowing'}
        {status === 'returned' && returnedAt && (
          <> on {new Date(returnedAt).toLocaleDateString()}</>
        )}
      </p>

      {status === 'borrowing' && (
        <button onClick={() => onReturn(_id)} className="return-btn">
          Return Book
        </button>
      )}
    </div>
  );
};

export default RecordItem;
