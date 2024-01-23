import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPurchaseModal = ({ isOpen, onClose, onSave }) => {
  const initialPurchaseState = {
    id_fournisseur: '',
    id_produit: '',
    quantite: '',
    statusPaiement: '',
    soldeRestant: '',
    centre: '',
    prixUnitaireHT: '',
    montantVerse: '',
  };
  const [purchase, setPurchase] = useState(initialPurchaseState);

  const [products, setProducts] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Remplacer par votre URL de l'API
      const response = await axios.get('http://localhost:3001/produits/');
      setProducts(response.data);
    };

    const fetchFournisseurs = async () => {
      // Remplacer par votre URL de l'API
      const response = await axios.get('http://localhost:3001/fournisseurs/');
      setFournisseurs(response.data);
    };

    const fetchCentres = async () => {
      // Remplacer par votre URL de l'API
      const response = await axios.get('http://localhost:3001/centres/');
      setCentres(response.data);
    };

    fetchProducts();
    fetchFournisseurs();
    fetchCentres();
  }, );

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "id_produit") {
      const selectedProduct = products.find(product => product.code.toString() === value);
      if (selectedProduct) {
        setPurchase({
          ...purchase,
          id_produit: value,
          prixUnitaireHT: selectedProduct.prixUnitaireHT, // Mettez à jour le prix unitaire
        });
      } else {
        setPurchase({
          ...purchase,
          id_produit: value,
          prixUnitaireHT: '', // Réinitialisez le prix unitaire si aucun produit n'est sélectionné
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
    setPurchase(initialPurchaseState);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Add Purchase</h2>

          {/* Select pour les fournisseurs */}
          <select
            name="id_fournisseur"
            value={purchase.id_fournisseur}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select Fournisseur</option>
            {fournisseurs.map((fournisseur) => (
              <option key={fournisseur.code} value={fournisseur.code}>
                {fournisseur.nom}
              </option>
            ))}
          </select>

          {/* Select pour les produits */}
          <select
            name="id_produit"
            value={purchase.id_produit}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select Produit</option>
            {products.map((produit) => (
              <option key={produit.code} value={produit.code}>
                {produit.name}
              </option>
            ))}
          </select>

          {/* Select pour les centres */}
          <select
            name="centre"
            value={purchase.centre}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select Centre</option>
            {centres.map((centre) => (
              <option key={centre.code} value={centre.code}>
                {centre.name}
              </option>
            ))}
          </select>

          {/* Autres champs du formulaire */}
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
  name="prixUnitaireHT"
  placeholder="Prix Unitaire HT"
  value={purchase.prixUnitaireHT}
  className="block w-full p-2 border rounded"
  readOnly // Rend le champ en lecture seule
/>
       
          <input
            type="number"
            name="montantVerse"
            placeholder="montantVerse"
            value={purchase.montantVerse}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
       

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Save
          </button>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default AddPurchaseModal;
