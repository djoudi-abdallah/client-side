import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VscTrash, VscEdit, VscActivateBreakpoints } from 'react-icons/vsc';
import { useSearchParams, useLocation } from 'react-router-dom';
import NavBar from '../component/NavBar';
import TopBoard from '../component/TopBoard'; // You can include the TopBoard component if needed
import EditSalaryModal from '../component/EditSalaryModal'; // Create this component for editing Salary entries
import AddSalaryModal from '../component/AddSalaryModal'; // Create this component for adding Salary entries

function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams] = useSearchParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSalary, setCurrentSalary] = useState(null);

  const handleEditClick = (salary) => {
    setCurrentSalary(salary);
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setCurrentSalary(null);
    setIsAddModalOpen(true);
  };

  const handleSaveSalary = (updatedSalary) => {
    if (currentSalary) {
      axios
        .put(`http://localhost:3001/monthly_salaries/${currentSalary.code}`, updatedSalary)
        .then((response) => {
          fetchSalaries();
          setIsEditModalOpen(false);
        })
        .catch((error) => console.error('Error updating Salary:', error));
    } else {
      axios
        .post('http://localhost:3001/monthly_salaries', updatedSalary)
        .then((response) => {
          fetchSalaries();
          setIsEditModalOpen(false);
        })
        .catch((error) => {
          console.error('Error adding Salary:', error);
        });
    }
  };


  const handleIconClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = (code) => {
    axios
      .delete(`http://localhost:3001/monthly_salaries/${code}`)
      .then((response) => {
        fetchSalaries();
      })
      .catch((error) => {
        console.error('Error deleting Salary:', error);
      });
  };

  const fetchSalaries = () => {
    axios
      .get(`http://localhost:3001/monthly_salaries`)
      .then((response) => {
        setSalaries(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching Salaries:', error);
      });
  };

  useEffect(() => {
    fetchSalaries();
  }, );

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
              {/* You can include a similar TopBoard component here if needed */}
              <div className='bg-white w-full rounded-xl shadow-2xl'>
                <div className='flex justify-between'>
                  <h2 className="text-xl font-serif px-10 py-6">Salaries Table:</h2>
                  <button
                    onClick={handleAddClick}
                    className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
                  >
                    Add Salary
                  </button>
                </div>

                <EditSalaryModal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  onSave={handleSaveSalary}
                  updatedSalary={currentSalary}
                />

                <AddSalaryModal
                  isOpen={isAddModalOpen}
                  onClose={() => setIsAddModalOpen(false)}
                  onSave={handleSaveSalary}
                />

                <div className='w-full flex flex-col items-center'>
                  <div className='grid gap-2 grid-cols-4  text-center py-4 place-content-center justify-center w-full font-serif'>
                    <h1>Salary ID</h1>
                    <h1>Employee</h1>
                    <h1>Amount</h1>
                    <h1>Edit</h1>
                  </div>

                  {salaries.map((salary, index) => (
                    <div
                      key={index}
                      className='grid gap-2   grid-cols-4 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'
                    >
                      <h1>{salary.code}</h1>
                      <h1>{salary.employeeDetails.nom}</h1>
                      <h1>{salary.salary}</h1>
                      <div onClick={handleIconClick} className='flex items-center justify-center'>
                        {isEditing ? (
                          <>
                            <VscTrash
                              onClick={() => handleDeleteClick(salary.code)}
                              className='cursor-pointer text-red-500'
                            />
                            <VscEdit
                              onClick={() => handleEditClick(salary)}
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

export default Salary;
