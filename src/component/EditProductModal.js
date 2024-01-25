import React, { useState, useEffect } from 'react';

const EditProductModal = ({ isOpen, onClose, onSave, productData }) => {
  const [product, setProduct] = useState(productData);

  useEffect(() => {
    setProduct(productData);
  }, [productData]);
  const [isPriceValid, setIsPriceValid] = useState(true); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'price') {
      const priceValue = parseFloat(value);
      setIsPriceValid(!isNaN(priceValue) && priceValue >= 0);
    }
    setProduct({ ...product, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
    onClose();
  };
  useEffect(() => {
   
    setProduct(JSON.parse(JSON.stringify(productData)));
  }, [productData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[40%]">
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <h2 className="text-2xl font-bold">Edit Product</h2>
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
            className={`block w-full p-2 border rounded ${
              !isPriceValid ? 'bg-red-100' : ''
            }`}
          />
          {!isPriceValid && (
            <p className="text-red-500">Price must be greater than or equal to 0.</p>
          )}
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded ${
              !isPriceValid ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={!isPriceValid}
          >
            Mettre a jour
          </button>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 p-4">Fermer</button>
      </div>
    </div>
  );

};

export default EditProductModal;
