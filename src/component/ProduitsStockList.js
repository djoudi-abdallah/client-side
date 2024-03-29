import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscTrash, VscEdit, VscActivateBreakpoints } from 'react-icons/vsc';
import { useSearchParams, useLocation } from 'react-router-dom';

function ProduitsStockList() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams] = useSearchParams();


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("id");
﻿
 
  
 
  
  const handleIconClick = () => {
    setIsEditing(!isEditing);
  };
  
  const handleDeleteClick = (code) => {
    axios.delete(`http://localhost:3001/produitStock/${code}`)
    .then(response => {
      fetchProducts(); 
    })
    .catch(error => {
      console.error('Error deleting employe:', error);
      
    });
  };


  const fetchProducts = () => {
    axios.get(`http://localhost:3001/produitStockShop/${idShop}`)
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching employes:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  });


  
 
  return (
    <div className='bg-white w-full rounded-xl shadow-2xl'>
      
          <h2 className="text-xl font-serif px-10 py-6">Product Stock Table:</h2>
          
      
      <div className='w-full flex flex-col items-center'>
        <div className='grid gap-2 grid-cols-4 text-center py-4 place-content-center w-full font-serif'>
          <h1>Code</h1>
          <h1>Name</h1>
          {/* <h1>Status</h1> */}
          <h1>quantite</h1>
          <h1>Edit</h1>
        </div>   

        {products.map((prd, index) => (
  <div key={index} className='grid gap-2 grid-cols-4 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'>
    <h1>{prd.code}</h1>
    {prd.produitDetails ? (
      <h1>{prd.produitDetails.name}</h1>
    ) : (
      <h1>No name available</h1> // Display a fallback message or handle the case where 'prd.produitDetails' is null
    )}
    <h1>{prd.quantite}</h1>
    <div onClick={handleIconClick} className='flex items-center justify-center'>
      {isEditing ? (
        <>
          <VscTrash onClick={() => handleDeleteClick(prd.code)} className='cursor-pointer text-red-500' />
        </>
      ) : (
        <VscActivateBreakpoints className='cursor-pointer text-red-600' />
      )}
    </div>
  </div>
))}
      </div>
    </div>
  );
}

export default ProduitsStockList;
