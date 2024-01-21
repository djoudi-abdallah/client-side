import React , {useState , useEffect} from 'react'
import NavBar from '../component/NavBar'
import { VscActivateBreakpoints, VscTrash, VscEdit } from 'react-icons/vsc';
import TopBoard from '../component/TopBoard';
import FournisseurModal from '../component/FournisseurModel';
import axios from 'axios';






function Fournisseur() {
  
  const [fournisseurs, setFournisseurs] = useState([]);
  const [currentFournisseur, setCurrentFournisseur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  
  const [isEditing, setIsEditing] = useState(false);

    const handleIconClick = () => {
        setIsEditing(!isEditing);
      };

  
      const handleEditClick = (four) => {
        setCurrentFournisseur(four);
        setIsModalOpen(true);
      };
      

const handleDeleteClick = (code) => {
  axios.delete(`http://localhost:3001/fournisseurs/${code}`)
  .then(response => {
    fetchFournisseurs(); 
  })
  .catch(error => {
    console.error('Error deleting fournisseur:', error);
    
  });
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const fetchFournisseurs = () => {
    axios.get('http://localhost:3001/fournisseurs')
      .then(response => {
        setFournisseurs(response.data);
      })
      .catch(error => {
        console.error('Error fetching fournisseurs:', error);
      });
  };

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const handleSaveFournisseur = (fournisseurData) => {
    if (currentFournisseur) {
      // Update existing fournisseur
      axios.put(`http://localhost:3001/fournisseurs/${currentFournisseur.code}`, fournisseurData)
        .then(response => {
          fetchFournisseurs();
        })
        .catch(error => {
          console.error('Error updating fournisseur:', error);
        });
    } else {
      // Add new fournisseur
      axios.post('http://localhost:3001/fournisseurs', fournisseurData)
        .then(response => {
          fetchFournisseurs();
        })
        .catch(error => {
          console.error('Error adding fournisseur:', error);
        });
    }
    closeModal();
  };


  return (
    <div className='flex flex-col w-full md:w-[77%] lg:w-[80%] bg-gray-300/30 overflow-auto' >
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
  onSave={handleSaveFournisseur}
  fournisseurData={currentFournisseur}
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
    
      {fournisseurs.map((four , index) =>  (
       <div key={index} className='grid gap-2 grid-cols-4 md:grid-cols-5  text-center place-content-center bg-gray-400/30  w-[98%] my-2 py-3 rounded-xl justify-center'>
         <h1>{four.nom }{four.prenom}</h1>
         <h1>{four.adresse}</h1>
         <h1 className='hidden md:flex md:justify-center'>{four.telephone}</h1>
         <h1>{four.solde}</h1>
         
     
         <div onClick={handleIconClick} className='flex items-center justify-center'>
        {isEditing ? (
          <>
           <VscTrash onClick={() => handleDeleteClick(four.code)} className='cursor-pointer text-red-500'/>
           <VscEdit onClick={() => handleEditClick(four)} className='cursor-pointer text-blue-500 ml-2'/>
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
