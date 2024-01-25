import React, { useState, useEffect } from 'react';

const EditEmployeModal = ({ isOpen, onClose, onSave, employeData }) => {
    const [employe, setEmploye] = useState(employeData || {
        nom: '',
        prenom: '',
        adresse: '',
        telephone: '',
        salaire_jour: 0,
        centre: '',  
      });
    
      useEffect(() => {
        setEmploye(employeData || {
          nom: '',
          prenom: '',
          adresse: '',
          telephone: '',
          salaire_jour: 0,
          centre: '',
        });
      }, [employeData]);
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
  const [telephoneSuffix, setTelephoneSuffix] = useState('');

  const handleTelephoneChange = (event) => {
    const value = event.target.value.replace(/^\+213/, '');
    if (/^\d*$/.test(value)) {
      setTelephoneSuffix(value);
      setEmploye({ ...employe, telephone: "+213" + value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employe);
    onClose();
  };
  const [errorSalaire, setErrorSalaire] = useState("");
  if (!isOpen) return null;
  const isEditMode = employeData && Object.keys(employeData).length > 0;
  const isFormValid = !errorSalaire ;


  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Edit Employee</h2>
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
<input
  type="text"
  name="centre"
  placeholder="Centre ID"
  value={employe.centre}
  onChange={handleChange}
  className="block w-full p-2 border rounded"
/>
<button  
                 type="submit" 
                 className={`p-2 rounded text-white ${isFormValid ? 'bg-blue-500' : 'bg-red-500 cursor-not-allowed'}`}
                 disabled={!isFormValid}
          >
            Mettre a jour
          </button>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default EditEmployeModal;
