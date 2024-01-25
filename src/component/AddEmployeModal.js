import React, { useState } from 'react';

const AddEmployeModal = ({ isOpen, onClose, onSave }) => {
  const initialEmployeState = {
    nom: '',
    prenom: '',
    adresse: '',
    telephoneSuffix: '',
    salaire_jour: '',
    centre: '',
  };
  const [employe, setEmploye] = useState(initialEmployeState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "salaire_jour":
        if (parseFloat(value) < 0) {
          setErrorSalaire("Salaire ne peut pas être négatif");
        } else {
          setErrorSalaire(""); 
        }
        setEmploye({ ...employe, [name]: value });
        break;
      default:
        setEmploye({ ...employe, [name]: value });
        break;
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employe);
    onClose();
    setEmploye(initialEmployeState);
  };
  const [errorSalaire, setErrorSalaire] = useState("");
  const [telephoneSuffix, setTelephoneSuffix] = useState('');

  const handleTelephoneChange = (event) => {
    const value = event.target.value.replace(/^\+213/, '');
    if (/^\d*$/.test(value)) {
      setTelephoneSuffix(value);
      setEmploye({ ...employe, telephone: "+213" + value });
    }
  };
  
  const isFormValid = !errorSalaire ;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Add Employee</h2>
  
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={employe.nom}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={employe.prenom}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={employe.adresse}
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
                        
          <input
            type="number"
            name="salaire_jour"
            placeholder="Salaire par Jour"
            value={employe.salaire_jour}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          {errorSalaire && <p className="text-red-500">{errorSalaire}</p>}
          <select
            name="centre"
             value={employe.centre}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select centre</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
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
          fermer
        </button>
      </div>
    </div>
  );
};

export default AddEmployeModal;
