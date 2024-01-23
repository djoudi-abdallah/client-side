import React, { useState } from 'react';
import axios from 'axios';
// ... import necessary components

function AddPvModal({ isOpen, onClose, onAdd }) {
  const [date, setDate] = useState('');
  const [contente, setContente] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to add new PV
    axios.post('http://localhost:3001/pvsales', { date, contente })
      .then(response => {
        onAdd();
        onClose();
      })
      .catch(error => console.error('Error adding new PV:', error));
  };

  return (
    <div className={isOpen ? "modal display-block" : "modal display-none"}>
      {/* Modal content */}
      <form onSubmit={handleSubmit}>
        {/* Form fields for date and contente */}
        {/* Submit button */}
      </form>
    </div>
  );
}

export default AddPvModal;
