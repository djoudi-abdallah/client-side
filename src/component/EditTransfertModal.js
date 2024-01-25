import React, { useState, useEffect } from 'react';

const EditTransfertModal = ({ isOpen, onClose, onSave, currentTransfert }) => {
  const [quantite, setQuantite] = useState(0);
  const [isQuantiteValid, setIsQuantiteValid] = useState(true);

  useEffect(() => {
    if (currentTransfert) {
      setQuantite(currentTransfert.quantite || 0);
    }
  }, [currentTransfert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isQuantiteValid) {
      onSave({ ...currentTransfert, quantite });
      onClose();
    }
  };

  const handleQuantiteChange = (e) => {
    const newQuantite = parseInt(e.target.value);
    setQuantite(newQuantite);
    setIsQuantiteValid(!isNaN(newQuantite) && newQuantite >= 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Edit Transfert Quantity</h2>
          <input
            type="number"
            name="quantite"
            placeholder="Quantité"
            value={quantite}
            onChange={handleQuantiteChange}
            className={`block w-full p-2 border rounded ${
              !isQuantiteValid ? 'bg-white' : ''
            }`}
          />
          {!isQuantiteValid && (
            <p className="text-red-500">La quantité doit être supérieure ou égale à 0</p>
          )}
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded ${
              !isQuantiteValid ? 'bg-red-500 cursor-not-allowed' : ''
            }`}
            disabled={!isQuantiteValid}
          >
            Update
          </button>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default EditTransfertModal;
