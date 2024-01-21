import React, { useState, useEffect } from 'react';
import NavBar from '../component/NavBar';
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';
import TopBoard from '../component/TopBoard';
import axios from 'axios';
import AddClientModal from '../component/AddClientModal'; // Import the AddClientModal
import EditClientModal from '../component/EditClientModal'; // Import the EditClientModal

function Client() {
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditClick = (cli) => {
    setCurrentClient(cli);
    setIsEditModalOpen(true); // Open the Edit Client Modal
  };

  const handleAddClick = () => {
    setCurrentClient(null); // Set currentClient to null when adding a new client
    setIsAddModalOpen(true); // Open the Add Client Modal
  };

  const fetchClients = () => {
    axios
      .get('http://localhost:3001/clients/1')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  };

  const handleDeleteClick = (code) => {
    axios
      .delete(`http://localhost:3001/clients/${code}`)
      .then((response) => {
        fetchClients();
      })
      .catch((error) => {
        console.error('Error deleting client:', error);
      });
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSaveClient = (clientData) => {
    if (currentClient) {
      axios
        .put(`http://localhost:3001/clients/${currentClient.code}`, clientData)
        .then((response) => {
          fetchClients();
        })
        .catch((error) => {
          console.error('Error updating client:', error);
        });
    } else {
      axios
        .post('http://localhost:3001/clients', clientData)
        .then((response) => {
          fetchClients();
        })
        .catch((error) => {
          console.error('Error adding client:', error);
        });
    }
    closeAddModal();
    closeEditModal(); // Close both Add and Edit Modals
  };

  return (
    <div className="flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30 overflow-auto">
      <NavBar />
      <div className="rounded-xl bg-white shadow-2xl m-4">
        <TopBoard />
        <div className="flex justify-between mx-2 items-center">
          <h2 className="text-xl font-serif p-4 pl-10">Client Table</h2>
          <button
            onClick={handleAddClick} // Use handleAddClick for adding
            className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
          >
            Add Client
          </button>
          <AddClientModal
            isOpen={isAddModalOpen}
            onClose={closeAddModal}
            onSave={handleSaveClient}
          />
                   <EditClientModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            onSave={handleSaveClient}
            clientData={currentClient}
          />

        </div>
        <div className="w-full flex flex-col items-center">
          <div className="grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6 text-center py-4 place-content-center w-full font-serif">
            <h1>Name</h1>
            <h1>Surname</h1>
            <h1>Adresse</h1>
            <h1 className="hidden lg:flex lg:justify-center">Phone Number</h1>
            <h1 className="hidden md:flex md:justify-center">Credit</h1>
            <h1>Edit</h1>
          </div>
          {clients.map((cli, index) => (
            <div
              key={index}
              className="grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center"
            >
              <h1>{cli.nom}</h1>
              <h1>{cli.prenom}</h1>
              <h1>{cli.adresse}</h1>
              <h1 className="hidden md:flex md:justify-center">{cli.telephone}</h1>
              <h1>{cli.credit}</h1>
              <div onClick={handleIconClick} className="flex items-center justify-center">
                {isEditing ? (
                  <>
                    <VscTrash
                      onClick={() => handleDeleteClick(cli.code)}
                      className="cursor-pointer text-red-500"
                    />
                    <VscEdit
                      onClick={() => handleEditClick(cli)}
                      className="cursor-pointer text-blue-500 ml-2"
                    />
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

export default Client;
