import React , {useState , useEffect} from 'react'

import { useSearchParams, useLocation } from 'react-router-dom';
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';

import axios from 'axios';



function ClientsList() {
   
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("id");
  ﻿
  
  const [isEditing, setIsEditing] = useState(false);

    const handleIconClick = () => {
        setIsEditing(!isEditing);
      };

  
     
      const fetchClients = () => {
        axios.get(`http://localhost:3001/clients/${idShop}`)
          .then(response => {
            setClients(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching clients:', error);
          });
      };

const handleDeleteClick = (code) => {
  axios.delete(`http://localhost:3001/clients/${code}`)
  .then(response => {
    fetchClients(); 
  })
  .catch(error => {
    console.error('Error deleting client:', error);
    
  });
  };
  
  
  useEffect(() => {
    fetchClients();
  });

  
  
  
  
  
  
  return (
    <div className='flex flex-col w-full overflow-auto' >
    
    <div className='  bg-white shadow-2xl mt-4'>
   
   <div className='flex justify-between mx-2 items-center'>
   
     <h2 className="text-xl font-serif p-4 pl-10">Client Table</h2>
   

    </div>
    <div className='w-full flex flex-col items-center'>
       <div className='grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6 text-center py-4 place-content-center w-full font-serif'>
          <h1>Name</h1>
          <h1 >Surname</h1>
          <h1>Adresse</h1>
          <h1 className='hidden lg:flex lg:justify-center'>Phone Number</h1>
          <h1 className='hidden md:flex md:justify-center'>Credit</h1>
          <h1>Edit</h1>
       </div>   
  
    {clients.map((cli , index) =>  (
     <div key={index} className='grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6 text-center place-content-center bg-gray-400/30  w-[98%] my-2 py-3 rounded-xl justify-center'>
       <h1>{cli.nom }</h1>
       <h1>{cli.prenom }</h1>
       <h1>{cli.adresse}</h1>
       <h1 className='hidden md:flex md:justify-center'>{cli.telephone}</h1>
       <h1>{cli.credit}</h1>
       
   
       <div onClick={handleIconClick} className='flex items-center justify-center'>
      {isEditing ? (
        <>
         <VscTrash onClick={() => handleDeleteClick(cli.code)} className='cursor-pointer text-red-500'/>
        
        </>
      ) : (
        <VscActivateBreakpoints className='cursor-pointer'/>
      )}
    </div>
    </div>
    ))}</div>
   
  </div>
  
  </div>
  )
}

export default ClientsList
