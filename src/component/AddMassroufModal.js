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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(massrouf);
    onClose();
    setMassrouf(initialMassroufState);
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
            onChange={ handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionnez un employé</option>
            {employes.map((employe) => (
                <option key={employe.code} value={employe.code}>
                {employe.nom}
                {console.log(employe.code)}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={massrouf.amount}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          
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

export default AddMassroufModal;
