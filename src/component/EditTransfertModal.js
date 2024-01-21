import React, { useState, useEffect } from 'react';

const EditTransfertModal = ({ isOpen, onClose, onSave, currentTransfert }) => {
  const [quantite, setQuantite] = useState(0);

  useEffect(() => {
    // Set the quantity to the current transfert's quantity when the modal opens
    if (currentTransfert) {
      setQuantite(currentTransfert.quantite || 0);
    }
  }, [currentTransfert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...currentTransfert, quantite });
    onClose();
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
            onChange={(e) => setQuantite(e.target.value)}
            className="block w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
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
