import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscTrash, VscEdit, VscActivateBreakpoints } from 'react-icons/vsc';
import { useSearchParams, useLocation } from 'react-router-dom';
import NavBar from '../component/NavBar';
import TopBoard from '../component/TopBoard';
import AddTransfertModal from '../component/AddTransfertModal'; // Import the AddTransfertModal
import EditTransfertModal from '../component/EditTransfertModal'; // Import the EditTransfertModal

function Transfert() {
  const [transferts, setTransferts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams] = useSearchParams();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTransfert, setCurrentTransfert] = useState(null);

  const handleEditClick = (transfert) => {
    setCurrentTransfert(transfert);
    setIsEditModalOpen(true); // Open the Edit Transfert Modal
  };

  const handleAddClick = () => {
    setCurrentTransfert(null); // Set currentTransfert to null when adding a new transfert
    setIsAddModalOpen(true); // Open the Add Transfert Modal
  };

  const handleSaveTransfert = (updatedTransfert) => {
    if(currentTransfert){
    axios
      .put(`http://localhost:3001/transferts/${currentTransfert.code}`, updatedTransfert)
      .then((response) => {
        fetchTransferts();
        setIsEditModalOpen(false);
      })
      .catch((error) => console.error('Error updating transfert:', error));
    } else {
      
        axios
          .post('http://localhost:3001/transferts', updatedTransfert)
          .then((response) => {
            fetchTransferts();
            setIsEditModalOpen(false);
          })
          .catch((error) => {
            console.error('Error adding employe:', error);
          });
      }
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idShop = queryParams.get("id");

  const handleIconClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = (code) => {
    axios
      .delete(`http://localhost:3001/transferts/${code}`)
      .then((response) => {
        fetchTransferts();
      })
      .catch((error) => {
        console.error('Error deleting transfert:', error);
      });
  };

  const fetchTransferts = () => {
    axios
      .get(`http://localhost:3001/transferts`) // Modify the API endpoint to retrieve all transferts
      .then((response) => {
        setTransferts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching transferts:', error);
      });
  };

  useEffect(() => {
    fetchTransferts();
  }, []);

  return (
    <div className='bg-gray-300/30 w-full md:w-[77%] lg:w-[82%] overflow-y-auto'>
      <NavBar />
      <div className='flex items-center'>
        <div className='w-full mr-2'>
          <div className='m-4 w-[97%]'>
            <div className='flex items-center'>
              <div className='m-4 w-[85%] px-1 bg-white rounded shadow-xl flex items-center'></div>
            </div>
            <div className='bg-white w-full rounded-xl shadow-2xl'>
              <TopBoard />
              <div className='bg-white w-full rounded-xl shadow-2xl'>
                <div className='flex justify-between'>
                  <h2 className="text-xl font-serif px-10 py-6">Transferts Table:</h2>
                  <button
                    onClick={handleAddClick} // Use handleAddClick for adding
                    className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
                  >
                    Add Transfert
                  </button>
                </div>

                <EditTransfertModal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  onSave={handleSaveTransfert}
                  updatedTransfert={currentTransfert}
                />

                <AddTransfertModal
                  isOpen={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  onSave={handleSaveTransfert}
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
                    <div
                      key={index}
                      className='grid gap-2  md:grid-cols-5 grid-cols-4 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'
                    >
                      <h1 className='hidden md:flex md:justify-center'>{trf.code}</h1>
                      <h1><h1>{trf.productDetails ? trf.productDetails.name : 'N/A'}</h1>
</h1>
                      <h1>{trf.coutEquivalent}</h1>
                      <h1>{trf.quantite}</h1>
                      <div onClick={handleIconClick} className='flex items-center justify-center'>
                        {isEditing ? (
                          <>
                            <VscTrash
                              onClick={() => handleDeleteClick(trf.code)}
                              className='cursor-pointer text-red-500'
                            />
                            <VscEdit
                              onClick={() => handleEditClick(trf)}
                              className='cursor-pointer text-blue-500 ml-2'
                            />
                          </>
                        ) : (
                          <VscActivateBreakpoints className='cursor-pointer text-red-600' />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfert;
