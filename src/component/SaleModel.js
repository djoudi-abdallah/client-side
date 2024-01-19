// SaleModal.js
import React, { useState, useEffect } from 'react';

const SaleModal = ({ isOpen, onClose, onSave, saleData }) => {
  const [sale, setSale] = useState({
    client: '',
    produit: '',
    quantite: '',
    prixUnitaire: '',
    montantEncaisse: '',
    status: 'Non payé',
  });

  useEffect(() => {
    if (saleData) {
      setSale(saleData);
    }
  }, [saleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale({ ...sale, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(sale);
    onClose(); 
  };

  if (!isOpen) return null;

  return (
  
   <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
    <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
        <h2 className="text-2xl font-bold">Add Sale</h2> 
        <input
            type="text"
            name="centre"
            placeholder="Center"
            value={sale.center}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
        <input
            type="text"
            name="client"
            placeholder="Client"
            value={sale.client}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="produit"
            placeholder="Produit"
            value={sale.produit}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="number"
            name="quantite"
            placeholder="Quantité"
            value={sale.quantite}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="number"
            name="prixUnitaire"
            placeholder="Prix Unitaire"
            value={sale.prixUnitaire}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="number"
            name="montantEncaisse"
            placeholder="Montant Encaissé"
            value={sale.montantEncaisse}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          
          <select
            name="status"
            value={sale.status}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="Non payé">Non payé</option>
            <option value="Partiellement payé">Partiellement payé</option>
            <option value="Entièrement payé">Entièrement payé</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Enregistrer
          </button>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          Fermer
        </button>
      </div>
    </div>
   
  );
};

export default SaleModal;
