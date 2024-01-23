import React, { useState, useEffect } from 'react';

const EditMassroufModal = ({ isOpen, onClose, onSave, currentMassrouf }) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (currentMassrouf) {
      setAmount(currentMassrouf.amount || 0);
    }
  }, [currentMassrouf]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...currentMassrouf, amount });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Edit Massrouf Amount</h2>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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

export default EditMassroufModal;
