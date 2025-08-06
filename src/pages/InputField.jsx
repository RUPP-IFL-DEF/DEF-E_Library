import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded"
    />
  </div>
);

export default InputField;
