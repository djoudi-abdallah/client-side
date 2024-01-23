import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../component/NavBar';
import TopBoard from '../component/TopBoard';
import AddAbsenceModal from '../component/AddAbsenceModal';
import EditAbsenceModal from '../component/EditAbsenceModal';
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';


function Absence() {
  const [absences, setAbsences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAbsence, setCurrentAbsence] = useState(null);

  const handleEditClick = (absence) => {
    setCurrentAbsence(absence);
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setCurrentAbsence(null);
    setIsAddModalOpen(true);
  };

  const handleSaveAbsence = (updatedAbsence) => {
    if (currentAbsence) {
      axios
        .put(`http://localhost:3001/absences/${currentAbsence.code}`, updatedAbsence)
        .then((response) => {
          fetchAbsences();
          setIsEditModalOpen(false);
        })
        .catch((error) => console.error('Error updating Absence:', error));
    } else {
      axios
        .post('http://localhost:3001/absences', updatedAbsence)
        .then((response) => {
          fetchAbsences();
          setIsEditModalOpen(false);
        })
        .catch((error) => {
          console.error('Error adding Absence:', error);
        });
    }
  };

  const handleDeleteClick = (code) => {
    axios
      .delete(`http://localhost:3001/absences/${code}`)
      .then((response) => {
        fetchAbsences();
      })
      .catch((error) => {
        console.error('Error deleting Absence:', error);
      });
  };

  const fetchAbsences = () => {
    axios
      .get('http://localhost:3001/absences')
      .then((response) => {
        setAbsences(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Absences:', error);
      });
  };

  useEffect(() => {
    fetchAbsences();
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
                  <h2 className='text-xl font-serif px-10 py-6'>Absences Table:</h2>
                  <button
                    onClick={handleAddClick}
                    className='bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4'
                  >
                    Add Absence
                  </button>
                </div>

                <EditAbsenceModal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  onSave={handleSaveAbsence}
                  updatedAbsence={currentAbsence}
                />

                <AddAbsenceModal
                  isOpen={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  onSave={handleSaveAbsence}
                />

                <div className='w-full flex flex-col items-center'>
                  <div className='grid gap-2 grid-cols-4  text-center py-4 place-content-center justify-center w-full font-serif'>
                    <h1 className='hidden md:flex md:justify-center'>Absence ID</h1>
                    <h1>Employee</h1>
                    <h1>Date</h1>
                    <h1>Edit</h1>
                  </div>

                  {absences.map((absence, index) => (
                    <div
                      key={index}
                      className='grid gap-2   grid-cols-4 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'
                    >
                        {console.log(absence)}
                      <h1 className='hidden md:flex md:justify-center'>{absence.code}</h1>
                      <h1>{absence.employe}</h1>
                      <h1>{new Date(absence.date).toLocaleDateString()}</h1>
                      <div onClick={() => handleEditClick(absence)} className='flex items-center justify-center'>
                        {isEditing ? (
                          <>
                            <VscTrash
                              onClick={() => handleDeleteClick(absence.code)}
                              className='cursor-pointer text-red-500'
                            />
                            <VscEdit
                              onClick={() => handleEditClick(absence)}
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

export default Absence;
