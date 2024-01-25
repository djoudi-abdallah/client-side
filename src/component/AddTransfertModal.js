import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTransfert = ({ isOpen, onClose, onSave }) => {
  const [transfert, setTransfert] = useState({
    produit: '',
    quantite: '',
  });
  const [errorQuantite, setErrorQuantite] = useState('');
  const [produits, setProduits] = useState([]);
  const [selectedProduitQuantite, setSelectedProduitQuantite] = useState(null);

  const fetchProduits = (centreId) => {
    axios.get(`http://localhost:3001/produitStockShop/${centreId}`)
      .then(response => {
        setProduits(response.data);
      })
      .catch(error => {
        console.error('Error fetching produits:', error);
      });
  };

  useEffect(() => {
    if (transfert.centre) {
      fetchProduits(transfert.centre);
    }
  }, [transfert.centre]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'centre') {
      setProduits([]); 
      setTransfert({ ...transfert, centre: value, produit: '' }); 
    } else if (name === 'produit') {
      const selectedProduit = produits.find(prod => prod.code == value);
      console.log(selectedProduit);
      if (selectedProduit) {
        setSelectedProduitQuantite(selectedProduit.quantite);
      } else {
        setSelectedProduitQuantite(null);
      }
    } else if (name === 'quantite') {
      const quantiteValue = parseFloat(value);
      if (quantiteValue <= 0 || (selectedProduitQuantite !== null && quantiteValue > selectedProduitQuantite)) {
        setErrorQuantite("La quantité demandée doit être supérieure à 0 et inférieure ou égale à la quantité disponible du produit");
      } else {
        setErrorQuantite('');
      }
    }

    setTransfert({ ...transfert, [name]: value });
  };
  const isFormValid = errorQuantite === '' &&
                      transfert.produit &&
                      parseFloat(transfert.quantite) > 0 &&
                      (selectedProduitQuantite === null || parseFloat(transfert.quantite) <= selectedProduitQuantite);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSave(transfert);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Ajouter un Transfert</h2>
          
          
          <select
            name="centre"
            value={transfert.centre}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionner un centre</option>
            <option value={1}>Centre 1</option>
            <option value={2}>Centre 2</option>
            <option value={3}>Centre 3</option>
            <option value={4}>Centre 4</option>
          </select>
          
          <select
            name="produit"
            value={transfert.produit}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionner un produit</option>
            {produits.map((prod, index) => (
              <option key={index} value={prod.code}>
                {prod.produitDetails.name}
                {/* {console.log(prod)} */}
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
          {errorQuantite && <p className="text-red-500">{errorQuantite}</p>}

          <button  
            type="submit" 
            className={`p-2 rounded text-white ${isFormValid ? 'bg-blue-500' : 'bg-red-500 cursor-not-allowed'}`}
            disabled={!isFormValid}
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

export default AddTransfert;
