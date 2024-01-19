// ClientModal.js
import React, { useState, useEffect } from 'react';

const ClientModal = ({ isOpen, onClose, onSave, clientData }) => {
  const [client, setClient] = useState(clientData || {
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
  });

  useEffect(() => {
    setClient(clientData || {
      nom: '',
      prenom: '',
      adresse: '',
      telephone: '',
    });
  }, [clientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(client); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Add Client</h2>

          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={client.nom}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={client.prenom}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={client.adresse}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="telephone"
            placeholder="Numéro de Téléphone"
            value={client.telephone}
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

export default ClientModal;
