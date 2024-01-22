import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTransfertModal = ({ isOpen, onClose, onSave }) => {
  const initialTransfertState = {
    id_produit: '',
    centre: '',
    quantite: '',
  };

  const [transfert, setTransfert] = useState(initialTransfertState);
  const [centres, setCentres] = useState([2, 3, 4]);
  const [produits, setProduits] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransfert({ ...transfert, [name]: value });
  };

  const handleCentreChange = (e) => {
    const selectedCentre = e.target.value;
    setTransfert({ ...transfert, centre: selectedCentre });
    
    // Faites une requête API pour obtenir les produits en fonction du centre sélectionné
    axios.get(`http://localhost:3001/transfertsShop/${selectedCentre}`)
      .then(response => {
        setProduits(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits :', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(transfert);
    onClose();
    setTransfert(initialTransfertState);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Add Transfert</h2>
          
          <select
            name="centre"
            value={transfert.centre}
            onChange={handleCentreChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionnez un centre</option>
            {centres.map((centre) => (
              <option key={centre} value={centre}>{centre}</option>
            ))}
          </select>

          <select
            name="id_produit"
            value={transfert.id_produit}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionnez un produit</option>
            {produits.map((produit) => (
              <option key={produit.code} value={produit.id_produit}>
                {produit.productDetails.name}
                
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantite"
            placeholder="Quantité"
            value={transfert.quantite}
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

export default AddTransfertModal;
