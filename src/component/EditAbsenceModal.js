import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAbsenceModal = ({ isOpen, onClose, onSave, updatedAbsence }) => {
  const [absence, setAbsence] = useState(updatedAbsence || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbsence({ ...absence, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(absence);
    onClose();
  };

  useEffect(() => {
    setAbsence(updatedAbsence || {});
  }, [updatedAbsence]);

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-3">
    <h2 className="text-2xl font-bold">Edit Absence</h2>
  
    <input
      type="date"
      name="date"
      placeholder="Date"
      value={absence.date}
      onChange={handleChange}
      className="block w-full p-2 border rounded"
    />
  
    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
      Save Changes
    </button>
  </form>
  );
};

export default EditAbsenceModal;