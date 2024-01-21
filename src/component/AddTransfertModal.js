import React, { useState } from 'react';

const AddTransfertModal = ({ isOpen, onClose, onSave }) => {
  const [id_produit, setIdProduit] = useState('');
  const [centre, setCentre] = useState('');
  const [quantite, setQuantite] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id_produit, centre, quantite });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Add Transfert</h2>
          
          <input
            type="text"
            name="id_produit"
            placeholder="ID Produit"
            value={id_produit}
            onChange={(e) => setIdProduit(e.target.value)}
            className="block w-full p-2 border rounded"
          />

          <input
            type="text"
            name="centre"
            placeholder="Centre"
            value={centre}
            onChange={(e) => setCentre(e.target.value)}
            className="block w-full p-2 border rounded"
          />

          <input
            type="number"
            name="quantite"
            placeholder="Quantité"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
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

export default AddTransfertModal;
