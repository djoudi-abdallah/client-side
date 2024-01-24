// PurchaseModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PurchaseModal = ({ isOpen, onClose, onSave, achatData }) => {
  const [purchase, setPurchase] = useState(
    achatData || {
      id_fournisseur: "",
      id_produit: "",
      quantite: "",
      statusPaiement: "",
      soldeRestant: "",
      prixUnitaireHT: "",
      montantVerse: "",
    }
  );

  useEffect(() => {
    if (isOpen && achatData) {
      setPurchase(achatData);
    } else {
   
      setPurchase({
        id_fournisseur: "",
        id_produit: "",
        quantite: "",
        statusPaiement: "",
        soldeRestant: "",
        prixUnitaireHT: "",
        montantVerse: "",
      });
    }
  }, [achatData, isOpen]);
    
  const [products, setProducts] = useState([]);

  const getRequest = async () => {
    try {
      const response = await axios.get("http://localhost:3001/produits/");
      setProducts(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const [fournisseurs, setFournisseurs] = useState([]);

  const getFournisseurs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fournisseurs/");
      setFournisseurs(response.data); 
    } catch (error) {
      console.error("Error fetching fournisseurs:", error);
    }
  };

  useEffect(() => {
    getFournisseurs();
  }, []);
  const [centres, setCntre] = useState([]);

  const getCentre = async () => {
    try {
      const response = await axios.get("http://localhost:3001/centres/");
      setCntre(response.data); // Update centres state
    } catch (error) {
      console.error("Error fetching centre:", error);
    }
  };

  useEffect(() => {
    getCentre();
  }, []);

  const [isInputValid, setIsInputValid] = useState(true);
  const [errorQuantite, setErrorQuantite] = useState("");
  const [errorMontantVerse, setErrorMontantVerse] = useState("");
  const [errorPrixUnitaire, setErrorPrixUnitaire] = useState("");

  const validateNumberInput = (value, setError) => {
    if (value < 0) {
      setError("Ce n'est pas valide");
      return false;
    } else {
      setError("");
      return true;
    }
  };


  const checkValidity = (currentPurchase) => {
    return parseFloat(currentPurchase.quantite) >= 0 &&
           parseFloat(currentPurchase.montantVerse) >= 0 &&
           parseFloat(currentPurchase.prixUnitaire) >= 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
   
    let error = ""; 
   
  
  if (name === "quantite" || name === "montantVerse" || name === "prixUnitaire") {
    if (name === "quantite" && parseFloat(value) < 0) {
      error = "Quantité ne peut pas être négative";
    } else if (name === "montantVerse" && parseFloat(value) < 0) {
      error = "Montant versé ne peut pas être négatif";
    } else if (name === "prixUnitaire" && parseFloat(value) < 0) {
      error = "Prix unitaire ne peut pas être négatif";
    }
  }

  switch (name) {
    case "quantite":
      setErrorQuantite(error);
      break;
    case "montantVerse":
      setErrorMontantVerse(error);
      break;
    case "prixUnitaire":
      setErrorPrixUnitaire(error);
      break;
    default:
      break;
  }

    if (name === "produit") {
      const selectedProduct = products.find(
        (product) => product.code.toString() === value
      );
      if (selectedProduct) {
        setPurchase({
          ...purchase,
          id_produit: value, 
          prixUnitaireHT: selectedProduct.price.toString(),
        });
      } else {
        setPurchase({
          ...purchase,
          id_produit: value,
          prixUnitaire: "",
        });
      }
    } else if (name === "fournisseur") {
      const selectedFournisseur = fournisseurs.find(
        (fournisseur) => fournisseur.code.toString() === value
      );
      if (selectedFournisseur) {
        setPurchase({
          ...purchase,
          id_fournisseur: value, 
        });
      } else {
        setPurchase({
          ...purchase,
          id_fournisseur: value,
        
        });
      }
    } else {
      setPurchase({ ...purchase, [name]: value });
    }
  };
  const isFormValid = !errorQuantite && !errorPrixUnitaire && !errorMontantVerse;


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
             <option value="">Select Fournisseur</option>
            {fournisseurs.map((fournisseur) => (
              <option key={fournisseur.code} value={fournisseur.code}>
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
            <option value="">Select Product</option>
            {products.map((produit) => (
              <option key={produit.code} value={produit.code}>
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
      {errorQuantite && <p className="text-red-500">{errorQuantite}</p>}

      <input
      type="number"
      name="prixUnitaire"
      placeholder="Prix Unitaire"
      value={purchase.prixUnitaire}
      onChange={handleChange}
      className="block w-full p-2 border rounded"
    />
    {errorPrixUnitaire && <p className="text-red-500">{errorPrixUnitaire}</p>}
    

      <input
        type="number"
        name="montantVerse"
        placeholder="Montant Versé"
        value={purchase.montantVerse}
        onChange={handleChange}
        className="block w-full p-2 border rounded"
      />
      {errorMontantVerse && <p className="text-red-500">{errorMontantVerse}</p>}
          
          
          <select
            name="statusPaiement" 
            value={purchase.statusPaiment}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
             <option value="">Select product</option>
            <option value="Non payé">Non payé</option>  
            <option value="Partiellement payé">Partiellement payé</option>
            <option value="Entièrement payé">Entièrement payé</option>
          </select>

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

export default PurchaseModal;
