import React, { useState, useEffect } from "react";
import axios from "axios";

const AddReglementFournisseur = ({ isOpen, onClose, onSave }) => {
  const [reglement, setReglement] = useState({
    montantReglement: "",
    fournisseur: "",
  });
  const [errorSolde, setErrorSolde] = useState("");
  const [fournisseurs, setFournisseurs] = useState([]);
  const [selectedFournisseurSolde, setSelectedFournisseurSolde] = useState(null);

  const fetchFournisseurs = () => {
    axios.get('http://localhost:3001/fournisseurs')
      .then(response => {
        setFournisseurs(response.data);
      })
      .catch(error => {
        console.error('Error fetching fournisseurs:', error);
      });
  };

  useEffect(() => {
    fetchFournisseurs();
  }, );

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Champ modifié:", name, "Valeur:", value);
    
    if (name === "fournisseur") {
      console.log("Fournisseur sélectionné:", value);
      const selectedFournisseur = fournisseurs.find(four => four.code == value);
      console.log("Fournisseur trouvé:", selectedFournisseur);
      if (selectedFournisseur) {
        setSelectedFournisseurSolde(selectedFournisseur.solde);
        console.log("Solde du fournisseur sélectionné:", selectedFournisseur.solde);
      } else {
        setSelectedFournisseurSolde(null);
      }
    }
    
    if (name === "montantReglement") {
      const montantValue = parseFloat(value);
      if (montantValue <= 0 || (selectedFournisseurSolde !== null && montantValue > selectedFournisseurSolde)) {
        setErrorSolde("Le montant de règlement doit être supérieur à 0 et inférieur ou égal au solde du fournisseur");
      } else {
        setErrorSolde("");
      }
    }
  
    setReglement({ ...reglement, [name]: value });
  };
  
  const isFormValid = errorSolde === "" && 
                      reglement.fournisseur && 
                      parseFloat(reglement.montantReglement) > 0 &&
                      (selectedFournisseurSolde === null || parseFloat(reglement.montantReglement) <= selectedFournisseurSolde);
  

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSave(reglement);
      onClose();
    }
  };

  if (!isOpen) return null;
  
  


  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Ajouter un Règlement Fournisseur</h2>
          <select
            name="fournisseur"
            value={reglement.fournisseur}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            {/* {console.log(reglement.fournisseur)} */}
            <option value="">Sélectionner un fournisseur</option>
            {fournisseurs
              .filter(four => four.solde > 0)
              .map((four, index) => (
                <option key={index} value={four.code}>
                  {four.nom}
                </option>
              ))}
          </select>

          <input
            type="number"
            name="montantReglement"
            placeholder="Solde"
            value={reglement.montantReglement}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          {errorSolde && <p className="text-red-500">{errorSolde}</p>}

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

export default AddReglementFournisseur;
