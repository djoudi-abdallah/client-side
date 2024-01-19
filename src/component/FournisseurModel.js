// FournisseurModal.js
import React, { useState , useEffect} from 'react';

const FournisseurModal = ({ isOpen, onClose, onSave, fournisseurData }) => {
  const [fournisseur, setFournisseur] = useState(fournisseurData || {
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
  });

  useEffect(() => {
    setFournisseur(fournisseurData || {
      nom: '',
      prenom: '',
      adresse: '',
      telephone: '',
    });
  }, [fournisseurData]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFournisseur({ ...fournisseur, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(fournisseur); 
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Add Fournisseur</h2>

          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={fournisseur.nom}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={fournisseur.prenom}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={fournisseur.adresse}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="telephone"
            placeholder="Numéro de Téléphone"
            value={fournisseur.telephone}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
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

export default FournisseurModal;
