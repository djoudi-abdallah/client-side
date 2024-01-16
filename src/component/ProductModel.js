import React, { useState } from 'react';

const ProductModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState();

  const handleSave = () => {
    // You can perform validation or other actions before saving
    onSave({ name, designation,status,price });
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen bg-blue-400/50">
        <div className="bg-white w-[40%] p-6 rounded-2xl shadow-lg">
          <div className='flex justify-between  items-center mb-4'>
            <h2 className="text-2xl font-bold">Add Product</h2>
            <button onClick={onClose} className="">
              Fermer
            </button>
          </div>
          <div className="mb-4">
           
            <input
              type="text"
              id="name"
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            
            <input
              type="text"
              id="designation"
              placeholder='Designation'
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            
            <input
              type="text"
              id="status"
              placeholder='Status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            
            <input
              type="number"
              id="price"
              placeholder='PrixUnitaire'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex">
          <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={handleSave}
            >
              Enregistrer
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
