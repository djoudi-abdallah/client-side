import React, { useState, useEffect } from 'react';
import NavBar from '../component/NavBar';
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';
import TopBoard from '../component/TopBoard';
import AddFournisseurModal from '../component/AddFournisseurModal';
import EditFournisseurModal from '../component/EditFournisseurModal';
import axios from 'axios';
import AddReglementFournisseur from '../component/AddReglementFournissuer';

function Fournisseur() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [currentFournisseur, setCurrentFournisseur] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fetchFournisseurs = () => {
    axios.get('http://localhost:3001/fournisseurs')
      .then(response => {
        setFournisseurs(response.data);
      })
      .catch(error => {
        console.error('Error fetching fournisseurs:', error);
      });
  };

  const [isAddReglementOpen, setIsAddReglementOpen] = useState(false);

  const handleOpenAddReglement = () => {
    setIsAddReglementOpen(true);
  };

  const handleCloseAddReglement = () => {
    setIsAddReglementOpen(false);
  };
  const handleIconClick = () => {
    setIsEditing(!isEditing); 
  };
  useEffect(() => {
    fetchFournisseurs();
  }, );

  const handleAddFournisseur = () => {
    setCurrentFournisseur(null);
    setIsAddModalOpen(true);
  };

  const handleEditFournisseur = (fournisseur) => {
    setCurrentFournisseur(fournisseur);
    setIsEditModalOpen(true);
  };

  const handleDeleteFournisseur = (code) => {
    axios.delete(`http://localhost:3001/fournisseurs/${code}`)
      .then(() => {
        fetchFournisseurs();
      })
      .catch(error => {
        console.error('Error deleting fournisseur:', error);
      });
  };

  const handleSaveFournisseur = (fournisseurData) => {
    const action = currentFournisseur
      ? axios.put(`http://localhost:3001/fournisseurs/${currentFournisseur.code}`, fournisseurData)
      : axios.post('http://localhost:3001/fournisseurs', fournisseurData);

    action.then(() => {
      fetchFournisseurs();
    }).catch((error) => {
      console.error('Error saving fournisseur:', error);
    });

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };
  
  const handleSaveReglement = (reglementData) => {
    axios.post('http://localhost:3001/reglements', reglementData)
      .then(response => {
        console.log('Règlement ajouté avec succès :', response.data);
        setIsAddReglementOpen(false);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du règlement :', error);
      });
  };
  return (
    <div className='flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30 overflow-auto'>
      <NavBar/>
      <div className='rounded-xl bg-white shadow-2xl m-4'>
        <TopBoard/>
        <div className='flex justify-between mx-2 items-center'>
          <h2 className="text-xl font-serif p-4 pl-10">Fournisseur Table</h2>
          <div>
          <button
           onClick={handleOpenAddReglement}
            className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
          >
            Add Reglement
          </button>
          {isAddReglementOpen && (
        <AddReglementFournisseur
          isOpen={isAddReglementOpen}
          onClose={handleCloseAddReglement}
          onSave={handleSaveReglement
          }
        />
      )}
          <button
            onClick={handleAddFournisseur}
            className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
          >
            Add Fournisseur
          </button>
          </div>
        </div>
        <div className='w-full flex flex-col items-center'>
          <div className='grid gap-2 grid-cols-4 md:grid-cols-5 text-center py-4 place-content-center w-full font-serif'>
            <h1>Full Name</h1>
            <h1>Adresse</h1>
            <h1 className='hidden md:flex md:justify-center'>Phone Number</h1>
            <h1 >Sold</h1>
            <h1>Edit</h1>
          </div>
  
          {fournisseurs.map((four, index) => (
            <div key={index} className='grid gap-2 grid-cols-4 md:grid-cols-5 text-center place-content-center bg-gray-400/30 w-[98%] my-2 py-3 rounded-xl justify-center'>
              <h1>{four.nom} {four.prenom}</h1>
              <h1>{four.adresse}</h1>
              <h1 className='hidden md:flex md:justify-center'>{four.telephone}</h1>
              <h1>{four.solde}</h1>
              <div className='flex items-center justify-center'>
                {isEditing ? (
                  <>
                    <VscTrash onClick={() => handleDeleteFournisseur(four.code)} className='cursor-pointer text-red-500'/>
                    <VscEdit onClick={() => handleEditFournisseur(four)} className='cursor-pointer text-blue-500 ml-2'/>
                  </>
                ) : (
                  <VscActivateBreakpoints onClick={handleIconClick} className='cursor-pointer'/>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  
      <AddFournisseurModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveFournisseur}
      />
  
      <EditFournisseurModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveFournisseur}
        fournisseurData={currentFournisseur}
      />
    </div>
  );
  

  
}

export default Fournisseur;
