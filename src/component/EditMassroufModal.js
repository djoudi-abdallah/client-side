import React, { useState, useEffect } from 'react';

const EditMassroufModal = ({ isOpen, onClose, onSave, currentMassrouf }) => {
  const [amount, setAmount] = useState(0);
  const [isAmountValid, setIsAmountValid] = useState(true);

  useEffect(() => {
    if (currentMassrouf) {
      setAmount(currentMassrouf.amount || 0);
    }
  }, [currentMassrouf]);

  const handleAmountChange = (e) => {
    const newAmount = parseInt(e.target.value);
    setAmount(newAmount);
    setIsAmountValid(!isNaN(newAmount) && newAmount >= 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAmountValid) {
      onSave({ ...currentMassrouf, amount });
      onClose();
    }
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
            onChange={handleAmountChange}
            className={`block w-full p-2 border rounded ${
              !isAmountValid ? 'bg-white' : ''
            }`}
          />
          {!isAmountValid && (
            <p className="text-red-500">Le montant doit être supérieur ou égal à 0</p>
          )}

          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded ${
              !isAmountValid ? 'bg-red-500 cursor-not-allowed' : ''
            }`}
            disabled={!isAmountValid}
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

export default EditMassroufModal;
