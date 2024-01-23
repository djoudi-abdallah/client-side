import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscTrash, VscEdit, VscActivateBreakpoints } from 'react-icons/vsc';
import { useSearchParams, useLocation } from 'react-router-dom';
import NavBar from '../component/NavBar';
import TopBoard from '../component/TopBoard';
import AddMassroufModal from '../component/AddMassroufModal';
import EditMassroufModal from '../component/EditMassroufModal';

function Massrouf() {
  const [massroufs, setMassroufs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams] = useSearchParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMassrouf, setCurrentMassrouf] = useState(null);

  const handleEditClick = (massrouf) => {
    setCurrentMassrouf(massrouf);
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setCurrentMassrouf(null);
    setIsAddModalOpen(true);
  };

  const handleSaveMassrouf = (updatedMassrouf) => {
    if (currentMassrouf) {
      axios
        .put(`http://localhost:3001/massroufs/${currentMassrouf.code}`, updatedMassrouf)
        .then((response) => {
          fetchMassroufs();
          setIsEditModalOpen(false);
        })
        .catch((error) => console.error('Error updating Massrouf:', error));
    } else {
      axios
        .post('http://localhost:3001/massroufs', updatedMassrouf)
        .then((response) => {
          fetchMassroufs();
          setIsEditModalOpen(false);
        })
        .catch((error) => {
          console.error('Error adding Massrouf:', error);
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
      .delete(`http://localhost:3001/massroufs/${code}`)
      .then((response) => {
        fetchMassroufs();
      })
      .catch((error) => {
        console.error('Error deleting Massrouf:', error);
      });
  };

  const fetchMassroufs = () => {
    axios
      .get(`http://localhost:3001/massroufs`)
      .then((response) => {
        setMassroufs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Massroufs:', error);
      });
  };

  useEffect(() => {
    fetchMassroufs();
  },);
  

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
                  <h2 className="text-xl font-serif px-10 py-6">Massroufs Table:</h2>
                  <button
                    onClick={handleAddClick}
                    className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
                  >
                    Add Massrouf
                  </button>
                </div>

                <EditMassroufModal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  onSave={handleSaveMassrouf}
                  updatedMassrouf={currentMassrouf}
                />

                <AddMassroufModal
                  isOpen={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  onSave={handleSaveMassrouf}
                />

                <div className='w-full flex flex-col items-center'>
                  <div className='grid gap-2 grid-cols-4  text-center py-4 place-content-center justify-center w-full font-serif'>
                    <h1 className='hidden md:flex md:justify-center'>Massrouf ID</h1>
                    <h1>Employé</h1>
                    <h1>Montant</h1>
                    <h1>Edit</h1>
                  </div>

                  {massroufs.map((masrouf, index) => (
                    <div
                      key={index}
                      className='grid gap-2   grid-cols-4 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'
                    >
                      <h1 className='hidden md:flex md:justify-center'>{masrouf.code}</h1>
                      <h1>{masrouf.employeeDetails.nom}</h1>
                      <h1>{masrouf.amount}</h1>
                      <div onClick={handleIconClick} className='flex items-center justify-center'>
                        {isEditing ? (
                          <>
                            <VscTrash
                              onClick={() => handleDeleteClick(masrouf.code)}
                              className='cursor-pointer text-red-500'
                            />
                            <VscEdit
                              onClick={() => handleEditClick(masrouf)}
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

export default Massrouf;
