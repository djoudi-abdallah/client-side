import React, { useState, useEffect } from 'react';

const EditSalaryModal = ({ isOpen, onClose, onSave, updatedSalary }) => {
  const [salary, setSalary] = useState(updatedSalary || {});
  const [isSalaryValid, setIsSalaryValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary({ ...salary, [name]: value });
    if (name === 'salary') {
      const newSalary = parseInt(value);
      setIsSalaryValid(!isNaN(newSalary) && newSalary >= 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSalaryValid) {
      onSave(salary);
      onClose();
    }
  };

  useEffect(() => {
    setSalary(updatedSalary || {});
  }, [updatedSalary]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Edit Salary</h2>

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={salary.salary || ''}
            onChange={handleChange}
            className={`block w-full p-2 border rounded ${
              !isSalaryValid ? 'bg-red-100' : ''
            }`}
          />
          {!isSalaryValid && (
            <p className="text-red-500">The salary must be greater than or equal to 0</p>
          )}

          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded ${
              !isSalaryValid ? 'bg-red-500 cursor-not-allowed' : ''
            }`}
            disabled={!isSalaryValid}
          >
            Save
          </button>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditSalaryModal;
