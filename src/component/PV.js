import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import EditPvModal from './EditPvModal';
import AddPvModal from './AddPvModal';
// ... import other necessary components and icons

function Pv() {
  const [pvs, setPvs] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPv, setCurrentPv] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("id");

  const fetchPvs = () => {
    axios.get(`http://localhost:3001/pvsales/${idShop}`)
      .then(response => {
        setPvs(response.data);
      })
      .catch(error => {
        console.error('Error fetching pvs:', error);
      });
  };

  useEffect(() => {
    fetchPvs();
  }, [idShop]);

  // ... include functions for handling edits, deletes, and adding new PVs

  return (
    <div className='bg-white w-full rounded-xl shadow-2xl'>
      <h2 className="text-xl font-serif px-10 py-6">PVs Table:</h2>

      <EditPvModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        
        currentPv={currentPv}
      />
      <AddPvModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        
      /> 

{pvs.map((pv, index) => (
  <div key={index} className='grid gap-2 grid-cols-3 text-center place-content-center items-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'>
  
    <h1>{pv.code}</h1>
    <h1>{new Date(pv.date).toLocaleDateString()}</h1>
    <h1>{pv.contente}</h1>
  </div>
))}

    </div>
  );
}

export default Pv;
