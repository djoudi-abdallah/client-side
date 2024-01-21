import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscTrash, VscEdit, VscActivateBreakpoints } from 'react-icons/vsc';
import { useSearchParams, useLocation } from 'react-router-dom';

function TransfertsList() {
  const [transferts, setTransferts] = useState([]);
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
    axios.delete(`http://localhost:3001/transferts/${code}`)
    .then(response => {
      fetchTransferts(); 
    })
    .catch(error => {
      console.error('Error deleting deleting:', error);
      
    });
  };


  const fetchTransferts = () => {
    axios.get(`http://localhost:3001/transfertsShop/${idShop}`)
      .then(response => {
        
        setTransferts(response.data);
      })
      .catch(error => {
        console.error('Error fetching employes:', error);
      });
  };

  useEffect(() => {
    fetchTransferts();
  });


  
 console.log(transferts);
  return (
    <div className='bg-white w-full rounded-xl shadow-2xl'>
      
          <h2 className="text-xl font-serif px-10 py-6">Product Stock Table:</h2>
          
      
      <div className='w-full flex flex-col items-center'>
        <div className='grid gap-2 grid-cols-4 md:grid-cols-5 text-center py-4 place-content-center w-full font-serif'>
          <h1>Code transfert</h1>
          <h1>Produit</h1>
          <h1>Cout Equivalent</h1>
          <h1>quantite</h1>
          <h1>Edit</h1>
        </div>   
  
        {Array.isArray(transferts) && transferts.map((trf, index) => (
          <div key={index} className='grid gap-2  md:grid-cols-5 grid-cols-4 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'>
            <h1 className='hidden md:flex'>{trf.code}</h1>
            <h1>{trf.id_produit}</h1>
            <h1>{trf.coutEquivalent}</h1>
            <h1>{trf.quantite}</h1>
            <div onClick={handleIconClick} className='flex items-center justify-center'>
        {isEditing ? (
          <>
            <VscTrash onClick={() => handleDeleteClick(trf.code)} className='cursor-pointer text-red-500' />
           
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

export default  TransfertsList;
