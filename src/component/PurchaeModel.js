// PurchaseModal.js
import React, { useState } from 'react';
import fournisseurData from '../data.js/FournisseurData';
import vegetableProducts from '../data.js/vegetableProducts';

const PurchaseModal = ({ isOpen, onClose, onSave }) => {
  const [purchase, setPurchase] = useState({
    fournisseur: '',
    produit: '',
    quantite: '',
    prixUnitaire: '',
    montantVerse: '',
    statusPaiment: 'Non payé',
  });


    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if (name === 'produit') {
        const selectedProduct = vegetableProducts.find(product => product.name === value);
        if (selectedProduct) {
          setPurchase({ 
            ...purchase, 
            produit: value,
            prixUnitaire: selectedProduct.price.toString() 
          });
        } else {
         
          setPurchase({ 
            ...purchase, 
            [name]: value,
            prixUnitaire: '' 
          });
        }
      } else {
        setPurchase({ ...purchase, [name]: value });
      }
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(purchase);
    onClose();
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
        <h2 className="text-2xl font-bold">Add Purchase</h2> 

          <select
            name="fournisseur"
            value={purchase.fournisseur}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            {fournisseurData.map((fournisseur, index) => (
              <option key={index} value={fournisseur.nom}>
                {fournisseur.nom}
              </option>
            ))}
          </select>
          <select
            name="produit"
            value={purchase.produit}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            {vegetableProducts.map((produit, index) => (
              <option key={index} value={produit.name}>
                {produit.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantite"
            placeholder="Quantité"
            value={purchase.quantite}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="number"
            name="prixUnitaire"
            placeholder="Prix Unitaire"
            value={purchase.prixUnitaire}
            onChange={handleChange}
            className="block w-full p-2 border rounded text-gray-500"
            readOnly
            
          />
          <input
            type="number"
            name="montantVerse"
            placeholder="Montant Versé"
            value={purchase.montantVerse}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <select
            name="statusPaiment"
            value={purchase.statusPaiment}
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

export default PurchaseModal;
