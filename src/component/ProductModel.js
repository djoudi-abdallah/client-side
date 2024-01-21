import React, { useState, useEffect } from 'react';

const ProductModal = ({ isOpen, onClose, onSave, productData }) => {
  const [product, setProduct] = useState(productData || {
    name: '',
    designation: '',
    status: '',
    price: 0,
  });
  const [isEditMode, setIsEditMode] = useState(!!productData);
  useEffect(() => {
    setProduct(productData || {
      name: '',
      designation: '',
      status: '',
      price: 0,
    });
  }, [productData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product); 
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            id="designation"
            placeholder="Designation"
            value={product.designation}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            id="status"
            placeholder="Status"
            value={product.status}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <input
            type="number"
            id="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {isEditMode ? 'Update' : 'Save'}
          </button>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
