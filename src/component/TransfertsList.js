import EditTransfertModal from './EditTransfertModal'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscTrash, VscEdit, VscActivateBreakpoints } from 'react-icons/vsc';
import { useSearchParams, useLocation } from 'react-router-dom';

function TransfertsList() {
  const [transferts, setTransferts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams] = useSearchParams();




  // ... existing states and functions
  const [isModalOpen, setIsModalOpen] = useState(false);
const [currentTransfert, setCurrentTransfert] = useState(null);

const handleEditClick = (transfert) => {
  setCurrentTransfert(transfert);
  setIsModalOpen(true);
};

const handleSaveTransfert = (updatedTransfert) => {
  axios.put(`http://localhost:3001/transferts/${currentTransfert.code}`, updatedTransfert)
    .then(response => {
      fetchTransferts();
      setIsModalOpen(false);
    })
    .catch(error => console.error('Error updating transfert:', error));
};

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


  

  return (
    <div className='bg-white w-full rounded-xl shadow-2xl'>
      
          <h2 className="text-xl font-serif px-10 py-6">Transferts Table:</h2>
          
          <EditTransfertModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSave={handleSaveTransfert}
  currentTransfert={currentTransfert}
/>
      <div className='w-full flex flex-col items-center'>
        <div className='grid gap-2 grid-cols-4 md:grid-cols-5 text-center py-4 place-content-center justify-center w-full font-serif'>
          <h1 className='hidden md:flex md:justify-center'>Code transfert</h1>
          <h1>Produit</h1>
          <h1>Cout Equivalent</h1>
          <h1>quantite</h1>
          <h1>Edit</h1>
        </div>   
  
        {transferts.map((trf, index) => (
          <div key={index} className='grid gap-2  md:grid-cols-5 grid-cols-4 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'>
            <h1 className='hidden md:flex md:justify-center'>{trf.code}</h1>
            {/* {console.log(trf.id_produit)} */}
            <h1>{trf.productDetails}</h1>
            <h1>{trf.coutEquivalent}</h1>
            <h1>{trf.quantite}</h1>
            <div onClick={handleIconClick} className='flex items-center justify-center'>
        {isEditing ? (
          <>
            <VscTrash onClick={() => handleDeleteClick(trf.code)} className='cursor-pointer text-red-500' />
            <VscEdit onClick={() => handleEditClick(trf)} className='cursor-pointer text-blue-500 ml-2'/> 

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
