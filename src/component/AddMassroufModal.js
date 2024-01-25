import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMassroufModal = ({ isOpen, onClose, onSave }) => {
  const initialMassroufState = {
    employe: 0,
    amount: 0,
    centre: '',
  };

  const [massrouf, setMassrouf] = useState(initialMassroufState);
  const [centres, setCentres] = useState([1, 2, 3, 4]);
  const [employes, setEmployes] = useState([]);
  const [isAmountValid, setIsAmountValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMassrouf({ ...massrouf, [name]: value });
  };

  const handleCentreChange = (e) => {
    const selectedCentre = e.target.value;
    setMassrouf({ ...massrouf, centre: selectedCentre });

    axios.get(`http://localhost:3001/employes/${selectedCentre}`)
      .then(response => {
        setEmployes(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des employés :', error);
      });
  };

  const handleAmountChange = (e) => {
    const newAmount = parseInt(e.target.value);
    setMassrouf({ ...massrouf, amount: newAmount });
    setIsAmountValid(!isNaN(newAmount) && newAmount >= 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAmountValid) {
      onSave(massrouf);
      onClose();
      setMassrouf(initialMassroufState);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Add Massrouf</h2>

          <select
            name="centre"
            value={massrouf.centre}
            onChange={handleCentreChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionnez un centre</option>
            {centres.map((centre) => (
              <option key={centre} value={centre}>{centre}</option>
            ))}
          </select>

          <select
            name="employe"
            value={massrouf.employe}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionnez un employé</option>
            {employes.map((employe) => (
              <option key={employe.code} value={employe.code}>
                {employe.nom}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={massrouf.amount}
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

export default AddMassroufModal;
