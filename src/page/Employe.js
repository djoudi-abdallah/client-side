import React, { useState, useEffect } from 'react';
import NavBar from '../component/NavBar';
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';
import TopBoard from '../component/TopBoard';
import AddEmployeModal from '../component/AddEmployeModal'; // Separate modal for adding employee
import EditEmployeModal from '../component/EditEmployeModal'; // Separate modal for editing employee
import axios from 'axios';

function Employee() {
  const [employes, setEmployes] = useState([]);
  const [currentEmploye, setCurrentEmploye] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleIconClick = () => {
    setIsEditing(!isEditing);
  };
  const openModal = () => {
    setCurrentEmploye(null); 
    setIsModalOpen(true);
  };
  
  const handleEditClick = (emp) => {
    setCurrentEmploye(emp);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (code) => {
    axios
      .delete(`http://localhost:3001/employes/${code}`)
      .then((response) => {
        fetchEmployes();
      })
      .catch((error) => {
        console.error('Error deleting employe:', error);
      });
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const fetchEmployes = () => {
    axios
      .get('http://localhost:3001/employes/1')
      .then((response) => {
        console.log(response.data);
        setEmployes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employes:', error);
      });
  };

  useEffect(() => {
    fetchEmployes();
  }, []);

  const handleSaveEmploye = (employeData) => {
    if (currentEmploye) {
      // Update an existing employee if currentEmploye is not null
      axios
        .put(`http://localhost:3001/employes/${currentEmploye.code}`, employeData)
        .then((response) => {
          fetchEmployes();
          closeEditModal();
        })
        .catch((error) => {
          console.error('Error updating employe:', error);
        });
    } else {
      // Add a new employee if currentEmploye is null
      axios
        .post('http://localhost:3001/employes', employeData)
        .then((response) => {
          fetchEmployes();
          closeAddModal();
        })
        .catch((error) => {
          console.error('Error adding employe:', error);
        });
    }
  };
 

  return (
    <div className="flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30 overflow-auto">
      <NavBar />
      <div className="rounded-xl bg-white shadow-2xl m-4">
        <TopBoard />
        <div className="flex justify-between mx-2 items-center">
          <h2 className="text-xl font-serif p-4 pl-10">Employee Table</h2>
          <button
          onClick={openAddModal}
          className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
        >
          Add Employee
        </button>
        {isAddModalOpen && (
        <AddEmployeModal
         isOpen={isAddModalOpen}
          onClose={closeAddModal}
          onSave={handleSaveEmploye}
        />
      )}
          <EditEmployeModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleSaveEmploye}
        employeData={currentEmploye}
      />
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6 text-center py-4 place-content-center w-full font-serif">
            <h1>Full Name</h1>
            <h1>Address</h1>
            <h1 className="hidden md:flex md:justify-center">Phone Number</h1>
            <h1 className="hidden md:flex md:justify-center">Salary/Day</h1>
            <h1>Salary</h1>
            <h1>Edit</h1>
          </div>
          {employes.map((emp, index) => (
            <div
              key={index}
              className="grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6 text-center place-content-center items-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center"
            >
              <h1>
                {emp.nom} {emp.prenom}
              </h1>
              <h1>{emp.adresse}</h1>
              <h1 className="hidden md:flex md:justify-center">{emp.telephone}</h1>
              <h1 className="hidden md:flex md:justify-center">{emp.salaire_jour}</h1>
              <h1>{emp.salaire}</h1>
              <div onClick={handleIconClick} className="flex items-center justify-center">
                {isEditing ? (
                  <>
                    <VscTrash onClick={() => handleDeleteClick(emp.code)} className="cursor-pointer text-red-500" />
                    <VscEdit onClick={() => handleEditClick(emp)} className="cursor-pointer text-blue-500 ml-2" />
                  </>
                ) : (
                  <VscActivateBreakpoints className="cursor-pointer" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Employee;
