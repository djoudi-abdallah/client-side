import React, { useState } from 'react';

const AddEmployeModal = ({ isOpen, onClose, onSave }) => {
  const initialEmployeState = {
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    salaire_jour: 0,
    centre: '',
  };
  const [employe, setEmploye] = useState(initialEmployeState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'salaire_jour' ? parseFloat(value) : value;
    setEmploye({ ...employe, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employe);
    onClose();
    setEmploye(initialEmployeState);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Add Employee</h2>
  
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={employe.nom}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={employe.prenom}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={employe.adresse}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="telephone"
            placeholder="Numéro de Téléphone"
            value={employe.telephone}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="number"
            name="salaire_jour"
            placeholder="Salaire par Jour"
            value={employe.salaire_jour}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="centre"
            placeholder="Centre"
            value={employe.centre}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
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

export default AddEmployeModal;
