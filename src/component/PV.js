import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscTrash, VscEdit } from 'react-icons/vsc';
import NavBar from '../component/NavBar';
import AddPvModal from '../component/AddPvModal';
import EditPvModal from '../component/EditPvModal';
import { useSearchParams, useLocation } from 'react-router-dom';

function PvSale() {
  const [pvsales, setPvsales] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPv, setCurrentPv] = useState(null);
  const [selectedPvId, setSelectedPvId] = useState(null);

  const fetchPvsales = () => {
    axios
      .get(`http://localhost:3001/pvsales/${idShop}`)
      .then((response) => {
        setPvsales(response.data);
      })
      .catch((error) => {
        console.error('Error fetching PV sales:', error);
      });
  };

  useEffect(() => {
    fetchPvsales();
  }, );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("id");


  const handleAddClick = () => {
    setCurrentPv(null);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (pv) => {
    setCurrentPv(pv);
    setIsEditModalOpen(true);
  };

  const handleSavePv = (updatedPv) => {
    const apiEndpoint = currentPv ? `pvsales/${currentPv.id}` : 'pvsales';
    const apiMethod = currentPv ? axios.put : axios.post;

    apiMethod(`http://localhost:3001/${apiEndpoint}`, updatedPv)
      .then(() => {
        fetchPvsales();
        setIsEditModalOpen(false);
        setIsAddModalOpen(false);
      })
      .catch((error) => {
        console.error('Error saving PV:', error);
      });
  };

  const handleDeleteClick = (code) => {
    axios
      .delete(`http://localhost:3001/pvsale/${code}`)
      .then(() => {
        fetchPvsales();
      })
      .catch((error) => {
        console.error('Error deleting PV:', error);
      });
  };
  useEffect(() => {
    if (selectedPvId) {
      axios.get(`http://localhost:3001/pvsale/${selectedPvId}`)
        .then(response => {
          setCurrentPv(response.data);
          setIsEditModalOpen(true);
        })
        .catch(error => {
          console.error('Error fetching PV:', error);
        });
    }
  }, [selectedPvId]);

  return (
    <div>
      <NavBar />
      <div className='flex justify-between mx-2 items-center'>
      <h2 className="text-xl font-serif p-4 pl-10">Pv List</h2>
      <button
      onClick={() => setIsAddModalOpen(true)}
        className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
      >
        Add Pv
      </button></div>
      <div className="w-full flex flex-col items-center">
  <div className="grid gap-2 grid-cols-3  text-center py-4 place-content-center w-full font-serif">
    <h1>Code</h1>
    <h1>Date</h1>
    <h1 >Edit</h1>
  </div>
  {pvsales.map((pv, index) => (
    <div
      key={index}
      className="grid gap-2 grid-cols-3 text-center place-content-center items-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center"
    > 
      <h1>{pv.code}</h1>
      <h1>{new Date(pv.date).toLocaleDateString}</h1>
      <div className="flex items-center justify-center">
        <VscEdit onClick={() => handleEditClick(pv)} className="cursor-pointer text-blue-500 ml-2" />
        <VscTrash onClick={() => handleDeleteClick(pv.code)} className="cursor-pointer text-red-500" />
      </div>
    </div>
  ))}
</div>


      <AddPvModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSavePv}
      />

      <EditPvModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavePv}
        updatedPv={currentPv}
      />
    </div>
  );
}

export default PvSale;
