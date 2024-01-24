import React, { useState , useEffect } from "react";
import axios from "axios";

const AddReglementFournisseur = ({ isOpen, onClose, onSave }) => {
  const [reglement, setReglement] = useState({
    solde: "",
    fournisseur: "",
  });
  const [isEditing, setIsEditing] = useState(true)
  const [errorSolde, setErrorSolde] = useState("");
  const [fournisseurs, setFournisseurs] = useState([]);

  const fetchFournisseurs = () => {
    axios.get('http://localhost:3001/fournisseurs')
      .then(response => {
        setFournisseurs(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching fournisseurs:', error);
      });
  };
  const handleIconClick = () => {
    setIsEditing(!isEditing); 
  };
  useEffect(() => {
    fetchFournisseurs();
  }, );
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "solde") {
      if (parseFloat(value) <= 0) {
        setErrorSolde("Le solde doit être supérieur à 0");
      } else {
        setErrorSolde("");
      }
    }

    setReglement({ ...reglement, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errorSolde) {
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
  <option value="">Sélectionner un fournisseur</option>
  {fournisseurs.map((four, index) => (
    <option key={index} value={four.code}>
      {four.nom}
    </option>
  ))}
</select>

          <input
            type="number"
            name="solde"
            placeholder="Solde"
            value={reglement.solde}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          {errorSolde && <p className="text-red-500">{errorSolde}</p>}

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

export default AddReglementFournisseur;
