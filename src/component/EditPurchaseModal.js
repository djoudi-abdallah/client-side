// EditPurchaseModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPurchaseModal = ({ isOpen, onClose, onSave, achatData }) => {
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
  const [errorQuantite, setErrorQuantite] = useState("");
  const [errorMontantVerse, setErrorMontantVerse] = useState("");
  const [errorPrixUnitaire, setErrorPrixUnitaire] = useState("");
  const [products, setProducts] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  

  useEffect(() => {
    if (isOpen && achatData) {
      setPurchase(achatData);
    } else {
      // Reset to default values when closing the modal or when no data is passed
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

  useEffect(() => {
    const getRequest = async () => {
      try {
        const response = await axios.get("http://localhost:3001/produits/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getRequest();
  }, []);

  useEffect(() => {
    const getFournisseurs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/fournisseurs/");
        setFournisseurs(response.data);
      } catch (error) {
        console.error("Error fetching fournisseurs:", error);
      }
    };

    getFournisseurs();
  }, []);

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
    setPurchase({ ...purchase, [name]: value });
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
          <h2 className="text-2xl font-bold">Edit Purchase</h2>

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

          <select
            name="id_produit"
            value={purchase.id_produit}
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
            name="prixUnitaireHT"
            placeholder="Prix Unitaire"
            value={purchase.prixUnitaireHT}
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
            value={purchase.statusPaiement}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select Status de Paiement</option>
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

export default EditPurchaseModal;
