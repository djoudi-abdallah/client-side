import React, { useState, useEffect } from 'react';

const EditFournisseurModal = ({ isOpen, onClose, onSave, fournisseurData }) => {
  const [fournisseur, setFournisseur] = useState(fournisseurData);

  useEffect(() => {
    if (fournisseurData) {
      setFournisseur(fournisseurData);
    } else {
      setFournisseur({
        nom: '',
        prenom: '',
        adresse: '',
        telephoneSuffix: '',
      });
    }
  }, [fournisseurData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFournisseur({ ...fournisseur, [name]: value });
  };
  const handleTelephoneChange = (event) => {
    const value = event.target.value.replace(/^\+213/, '');
    if (/^\d*$/.test(value)) {
      setTelephoneSuffix(value);
      setFournisseur({ ...fournisseur, telephone: "+213" + value });
    }
  };
  
  const [telephoneSuffix, setTelephoneSuffix] = useState('');


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
          <h2 className="text-2xl font-bold">Edit Fournisseur</h2>
  
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
                 type="tel"
                 name="telephone"
                 placeholder="Numéro de Téléphone"
                 value={"+213" + telephoneSuffix}
                 onChange={handleTelephoneChange}
                 className="block w-full p-2 border rounded"
               />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Mettre à jour
          </button>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          Fermer
        </button>
      </div>
    </div>
  );
  
};

export default EditFournisseurModal;
