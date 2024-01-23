// AddAbsenceModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAbsenceModal = ({ isOpen, onClose, onSave }) => {
  const initialAbsenceState = {
    employe: '',
    date: '',
  };

  const [absence, setAbsence] = useState(initialAbsenceState);
  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbsence({ ...absence, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(absence);
    onClose();
    setAbsence(initialAbsenceState);
  };

  useEffect(() => {
    
    axios
      .get(`http://localhost:3001/employesAll`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Add Absence</h2>

          <select
            name="employe"
            value={absence.employe}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.code} value={employee.code}>
                {employee.nom}
              </option>
            ))}
          </select>

         

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add
          </button>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddAbsenceModal;
