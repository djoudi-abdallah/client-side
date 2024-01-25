import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AddReglementClient = ({ isOpen, onClose, onSave }) => {
  const [reglement, setReglement] = useState({
    montantPaye: "",
    client: "",
    centre: ""
  });
  const [errorCredit, setErrorCredit] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClientCredit, setSelectedClientCredit] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("id");

  useEffect(() => {
    const fetchClients = () => {
      axios.get(`http://localhost:3001/clients/${idShop}`)
        .then(response => {
          setClients(response.data);
        })
        .catch(error => {
          console.error('Error fetching clients:', error);
        });
    };

    if (idShop) {
      fetchClients();
    }
  }, [idShop]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "client") {
      const selectedClient = clients.find(cl => cl.code == value);
      if (selectedClient) {
        setSelectedClientCredit(selectedClient.credit);
        setReglement({ ...reglement, centre: selectedClient.centre });
      } else {
        setSelectedClientCredit(null);
      }
    }
    
    if (name === "montantPaye") {
      const montantValue = parseFloat(value);
      if (montantValue <= 0 || (selectedClientCredit !== null && montantValue > selectedClientCredit)) {
        setErrorCredit("Le montant payé doit être supérieur à 0 et inférieur ou égal au crédit du client");
      } else {
        setErrorCredit("");
      }
    }
  
    setReglement({ ...reglement, [name]: value });
  };
  
  const isFormValid = errorCredit === "" && 
                      reglement.client && 
                      parseFloat(reglement.montantPaye) > 0 &&
                      (selectedClientCredit === null || parseFloat(reglement.montantPaye) <= selectedClientCredit);
  
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
          <h2 className="text-2xl font-bold">Ajouter un Règlement Client</h2>
          <select
            name="client"
            value={reglement.client}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Sélectionner un client</option>
            {clients
              .filter(cl => cl.credit > 0)
              .map((cl, index) => (
                <option key={index} value={cl.code}>
                  {cl.nom}
                </option>
              ))}
          </select>

          <input
            type="number"
            name="montantPaye"
            placeholder="Montant Payé"
            value={reglement.montantPaye}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          {errorCredit && <p className="text-red-500">{errorCredit}</p>}

          <div className="block w-full p-2 border rounded">
            Centre: {reglement.centre}
          </div>

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

export default AddReglementClient;
