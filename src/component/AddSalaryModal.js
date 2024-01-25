import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSalaryModal = ({ isOpen, onClose, onSave }) => {
  const initialSalaryState = {
    employeId: 0,
    amount: 0,
  };

  const [salary, setSalary] = useState(initialSalaryState);
  const [employees, setEmployees] = useState([]);
  const [isAmountValid, setIsAmountValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary({ ...salary, [name]: value });
  };

  const handleAmountChange = (e) => {
    const newAmount = parseInt(e.target.value);
    setSalary({ ...salary, amount: newAmount });
    setIsAmountValid(!isNaN(newAmount) && newAmount >= 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAmountValid) {
      onSave(salary);
      onClose();
      setSalary(initialSalaryState);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/employesAll/`)
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
          <h2 className="text-2xl font-bold">Add Salary</h2>

          <select
            name="employeId"
            value={salary.employeId}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select an employee</option>
            {employees.map((employeID) => (
              <option key={employeID.code} value={employeID.code}>
                {employeID.nom}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={salary.amount}
            onChange={handleAmountChange}
            className={`block w-full p-2 border rounded ${
              !isAmountValid ? 'bg-white' : ''
            }`}
          />
          {!isAmountValid && (
            <p className="text-red-500">Le montant doit être supérieur ou égal à 0</p>
          )}

          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded ${
              !isAmountValid ? 'bg-red-500 cursor-not-allowed' : ''
            }`}
            disabled={!isAmountValid}
          >
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

export default AddSalaryModal;
