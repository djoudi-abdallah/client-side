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
    status: '',
  });
  const [clients, setClients] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [produits, setProduits] = useState([]);
  const [isQuantiteValid, setIsQuantiteValid] = useState(true);
  const [isMontantValid, setIsMontantValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);

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

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'prixUnitaire') {
      const prixUnitaireValue = parseFloat(value);
      setIsPriceValid(!isNaN(prixUnitaireValue) && prixUnitaireValue >= 0);
    }
    if (name === 'produit') {
      const selectedProductData = produits.find((p) => p.produit == value);
      setSelectedProduct(selectedProductData);
      console.log(selectedProductData);
      setSale({ ...sale, [name]: value, quantite: '' });
      setIsQuantiteValid(true); 
    } else {
      setSale({ ...sale, [name]: value });
    }

    if (name === 'quantite') {
      const quantiteValue = parseInt(value, 10);
      const isValid = !isNaN(quantiteValue) && quantiteValue >= 0 && (!selectedProduct || quantiteValue <= selectedProduct.quantite);
      setIsQuantiteValid(isValid);
    }

    if (name === 'montantEncaisse') {
      const montantValue = parseInt(value);
      setIsMontantValid(!isNaN(montantValue) && montantValue >= 0);
    }

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
            {produits.map((produit , index) => (
              <option key={index} value={produit.produit}>
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
            className={`block w-full p-2 border rounded ${
              !isQuantiteValid ? 'bg-white' : ''
            }`}
          />
          {!isQuantiteValid && (
            <p className="text-red-500">La quantité doit être supérieure ou égale à 0 ou Inferieur ou egale a Quantite du produit {
              selectedProduct.quantite
            }</p>
          )}

<input
  type="number"
  name="prixUnitaire" 
  placeholder="Prix Unitaire"
  value={sale.prixUnitaire}
  onChange={handleChange}
  className={`block w-full p-2 border rounded ${
    !isPriceValid ? 'bg-white' : ''
  }`}
/>

          <input
            type="number"
            name="montantEncaisse"
            placeholder="Montant Encaissé"
            value={sale.montantEncaisse}
            onChange={handleChange}
            className={`block w-full p-2 border rounded ${
              !isMontantValid ? 'bg-white' : ''
            }`}
          />
          {!isMontantValid && (
            <p className="text-red-500">Le montant encaissé doit être supérieur ou égal à 0</p>
          )}

          <select
            name="status"
            value={sale.status}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="Non payé">select status</option>
            <option value="Non payé">Non payé</option>
            <option value="Partiellement payé">Partiellement payé</option>
            <option value="Entièrement payé">Entièrement payé</option>
          </select>

          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded ${
              !isQuantiteValid || !isMontantValid || !isPriceValid ? 'bg-red-500 cursor-not-allowed' : ''
            }`}
            disabled={!isQuantiteValid || !isMontantValid || !isPriceValid }
          >
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
