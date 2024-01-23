import React, { useState } from 'react';

const AddPvModal = ({ isOpen, onClose, onSave }) => {
  const initialPvState = {
   contente : '',
  };

  const [pv, setPv] = useState(initialPvState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPv({ ...pv, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(pv);
    onClose();
    setPv(initialPvState);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Add PV</h2>
          
          <input
            type="text"
            name="contente"
            placeholder="contenu"
            value={pv.contente}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />

          
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add
          </button>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddPvModal;
