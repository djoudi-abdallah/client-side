// SaleModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaleModal = ({ isOpen, onClose, onSave, saleData }) => {
  const [sale, setSale] = useState({
    centre: 1,
    client: '',
    produit: 0,
    quantite: '',
    prixUnitaire: '',
    montantEncaisse: '',
    status: 'Non payé',
  });
  const [clients, setClients] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [produits, setProduits] = useState([]);
  
  useEffect(() => {
    if (selectedCenter !== '') {
      axios.get(`http://localhost:3001/clients/${selectedCenter}`)
        .then(response => {
          setClients(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des clients :', error);
        });
    }
  }, [selectedCenter]);

  useEffect(() => {
    if (selectedCenter !== '') {
      axios.get(`http://localhost:3001/produitStockShop/${selectedCenter}`)
        .then(response => {
          setProduits(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des produits :', error);
        });
    }
  }, [selectedCenter]);

  useEffect(() => {
    if (saleData) {
      setSale(saleData);
    }
  }, [saleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale({ ...sale, [name]: value });
  };
  useEffect(() => {
    
    axios.get(`http://localhost:3001/produitStockShop/${selectedCenter}`)
      .then(response => {
        setProduits(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits :', error);
      });
  }, []);
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
          <select
            name="centre"
            value={sale.center}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectedCenter(selectedValue);
              handleChange(e);
            }}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionnez un centre</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>

          <select
            name="client"
            value={sale.client}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionnez un client</option>
            {clients.map((client) => (
              <option key={client.code} value={client.code}>
                {client.nom}
              </option>
            ))}
          </select>
          
          <select
            name="produit"

            value={sale.produit}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionnez un produit</option>
            {
            
            produits.map((produit) => (
              <option key={produit.code} value={produit.produit}>
                
                {produit.produitDetails.name}
              </option>
            ))}
          </select>

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
