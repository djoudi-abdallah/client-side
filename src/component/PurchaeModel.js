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
      centre: "",
      prixUnitaireHT: "",
      montantVerse: "",
    }
  );

  useEffect(() => {
    setPurchase(
      achatData || {
        id_fournisseur: "",
        id_produit: "",
        quantite: "",
        statusPaiement: "",
        soldeRestant: "",
        centre: "",
        prixUnitaireHT: "",
        montantVerse: "",
      }
    );
  }, [achatData]);
  const [products, setProducts] = useState([]);

  const getRequest = async () => {
    try {
      const response = await axios.get("http://localhost:3001/produits/");
      setProducts(response.data); // Update products state
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
      setFournisseurs(response.data); // Update fournisseurs state
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "produit") {
      const selectedProduct = products.find(
        (product) => product.code.toString() === value
      );
      if (selectedProduct) {
        setPurchase({
          ...purchase,
          id_produit: value, // Use the product code here
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
          id_fournisseur: value, // Use the fournisseur code here
          // other fournisseur related data
        });
      } else {
        setPurchase({
          ...purchase,
          id_fournisseur: value,
          // Reset or adjust other fournisseur related data
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
            {products.map((produit) => (
              <option key={produit.code} value={produit.code}>
                {produit.name}
              </option>
            ))}
          </select>
          <select
            name="centre"
            value={purchase.centre}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            {centres.map((centre) => (
              <option key={centre.code} value={centre.code}>
                {centre.name}
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
            value={purchase.prixUnitaireHT}
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
            name="statusPaiement" // Update the name attribute to match the field name
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
