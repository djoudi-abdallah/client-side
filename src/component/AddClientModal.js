import React, { useState } from 'react';

const AddClientModal = ({ isOpen, onClose, onSave }) => {
  const initialClientState = {
    nom: '',
    prenom: '',
    adresse: '',
    telephoneSuffix: '',
   
    centre: '',
  };
  const [client, setClient] = useState(initialClientState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'credit' ? parseFloat(value) : value;
    setClient({ ...client, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(client);
    onClose();
    setClient(initialClientState);
  };
  
  const [telephoneSuffix, setTelephoneSuffix] = useState('');

  const handleTelephoneChange = (event) => {
    const value = event.target.value.replace(/^\+213/, '');
    if (/^\d*$/.test(value)) {
      setTelephoneSuffix(value);
      setClient({ ...client, telephone: "+213" + value });
    }
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
                 type="tel"
                 name="telephone"
                 placeholder="Numéro de Téléphone"
                 value={"+213" + telephoneSuffix}
                 onChange={handleTelephoneChange}
                 className="block w-full p-2 border rounded"
               />
          
         
                            
         <select
  name="centre"
  value={client.centre}
  onChange={handleChange}
  className="block w-full p-2 border rounded"
>
  <option value="">Select Centre</option>
  <option value={1}>Centre 1</option>
  <option value={2}>Centre 2</option>
  <option value={3}>Centre 3</option>
  <option value={4}>Centre 4</option>
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

export default AddClientModal;
