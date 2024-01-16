import React , {useState} from 'react'
import NavBar from '../component/NavBar'
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';
import TopBoard from '../component/TopBoard';
import FournisseurData from '../data.js/FournisseurData';
import FournisseurModal from '../component/FournisseurModel';


function Fournisseur() {
  const [isEditing, setIsEditing] = useState(false);

    const handleIconClick = () => {
        setIsEditing(!isEditing);
      };

  
  const handleEditClick = () => {
        
    console.log('Editing sale:');
  };

const handleDeleteClick = () => {
   
    console.log('Deleting sale:');
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fournisseurList, setFournisseurList] = useState(FournisseurData);
  const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);
  const handleSaveFournissuer = (data) => {
    console.log(data); // Traitez les données ici (par exemple, les ajouter à un état global ou les envoyer à un serveur)
    setFournisseurList([...fournisseurList, data]);
    closeModal();
  };
  
  return (
    <div className='flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30' >
      <NavBar/>
      <div className='rounded-xl  bg-white shadow-2xl m-4'>
     <TopBoard/>
     <div className='flex justify-between mx-2 items-center'>
     
       <h2 className="text-xl font-serif p-4 pl-10">Fournisseur Table</h2>
      <button
      onClick={openModal}
        className="bg-violet-500 text-white px-4 py-2 rounded-md my-4 mr-4"
      >
        Add Fournisseur
      </button>
      <FournisseurModal
      isOpen={isModalOpen}
      onClose={closeModal}
      onSave={handleSaveFournissuer}
    />
      </div>
      <div className='w-full flex flex-col items-center'>
         <div className='grid gap-2 grid-cols-4 md:grid-cols-5  text-center py-4 place-content-center w-full font-serif'>
            <h1>Full Name</h1>
            <h1>Adresse</h1>
            <h1 className='hidden md:flex md:justify-center'>Phone Number</h1>
            <h1 >Sold</h1>
            <h1>Edit</h1>
         </div>   
    
      {FournisseurData.map((four , index) =>  (
       <div key={index} className='grid gap-2 grid-cols-4 md:grid-cols-5  text-center place-content-center bg-gray-400/30  w-[98%] my-2 py-3 rounded-xl justify-center'>
         <h1>{four.nom }{four.prenom}</h1>
         <h1>{four.adresse}</h1>
         <h1 className='hidden md:flex md:justify-center'>{four.telephone}</h1>
         <h1>{four.solde}</h1>
         
     
         <div onClick={handleIconClick} className='flex items-center justify-center'>
        {isEditing ? (
          <>
            <VscTrash onClick={handleDeleteClick} className='cursor-pointer text-red-500'/>
            <VscEdit onClick={handleEditClick} className='cursor-pointer text-blue-500 ml-2'/>
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

export default Fournisseur
